import axios from '../apiClient'
const baseUrl = '/api/login'

const login = async (creds) => {
  const user = window.localStorage.getItem('loggedUser')
  let config = ''
  if(!(user===null)) {
    config = {
      headers: {
        authorization: `Bearer ${JSON.parse(user).token}`
      }
    }
  }
  const res = await axios.post(baseUrl, creds, config)
  window.localStorage.setItem('loggedUser', JSON.stringify(res.data))
  return res.data
}

export default {login}