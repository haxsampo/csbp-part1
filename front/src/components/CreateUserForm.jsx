import { useState } from 'react'
import userService from '../services/user'

const CreateUserForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [safe, setSafe] = useState(false)

  const createUser = async (event) => {
    event.preventDefault()
    await userService.create({username:username, password:password, safe:safe})
  }
  return(
    <form onSubmit={createUser}>
      CREATE USER
      <div>
          username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}/>
        <div>
          password<input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <input type="checkbox" id="safe" onChange={()=>{setSafe(!safe)}} />
        <label >SAFE</label>
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default CreateUserForm