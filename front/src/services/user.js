import axios from '../apiClient'
const baseUrl = '/api/user'

const create = async(creds) => {
  const res = await axios.post(baseUrl, creds)
  return res.data
}

const get = async(user) => {
  const token = user.token
  const config = {
    headers: {
      authorization: `Bearer ${token}`
    }
  }
  const res = await axios.get(baseUrl+'/'+user.username, config)
  return res.data
}

export default { create, get }