const Logout = ({setUser}) => {

  const logout = () => {
    window.localStorage.clear()
    setUser('')
  }
  return(
    <button onClick={() => logout()}>Logout</button>
  )
}

export default Logout