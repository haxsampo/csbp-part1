import { useState } from 'react'
import loginService from '../services/login'

const LoginForm = ({setUser}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = async (event) => {
    event.preventDefault()
    
    const user = await loginService.login({username:username, password:password})
    setUser(user)
    setUsername('')
    setPassword('')
  }

  return(
    <form onSubmit={login}>
      LOGIN
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
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm