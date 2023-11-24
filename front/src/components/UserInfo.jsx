import { useState } from 'react'
import userService from '../services/user'

const UserInfo = ({user}) => {
  const [info, setInfo] = useState('')
  if(!user) {
    return null
  }
  
  const getInfo = async () => {
    console.log(user)
    const res = await userService.get(user)
    console.log(res)
  }

  return(
    <>
      <button onClick={() => getInfo()}>get user info</button>
    </>
  )
}

export default UserInfo