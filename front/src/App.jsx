import { useEffect, useState } from 'react'
import LoginForm from './components/Login'
import Logout from './components/Logout'
import CreateUserForm from './components/CreateUserForm'
import UserInfo from './components/UserInfo'
import './App.css'

function App() {
  const [user, setUser] = useState('jaska')

  useEffect(() => {
    const loggedUserJSON = JSON.parse(window.localStorage.getItem('loggedUser'))
    setUser(loggedUserJSON)
  }, [])

  return (
    <>
      <div>
      < LoginForm setUser={setUser}/>
      </div>
      <div>
        <CreateUserForm />
      </div>
      {user &&
      <Logout setUser={setUser}/>}
      {user &&
      <UserInfo user={user}/>}
    </>
  )
}

export default App
