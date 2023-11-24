const fs = require("fs")

const usersPath = './data/users.json'
const usersPathSafe = './data/users_safe.json'

const getUsers = (safe) => {
  if(safe) {
    const usersString = fs.readFileSync(usersPathSafe, 'utf8')
    return JSON.parse(usersString)
  } else {
    const usersString = fs.readFileSync(usersPath, 'utf8')
    return JSON.parse(usersString)
  } 
}


const setUsers = (users, safe) => {
  const jsonString = JSON.stringify(users)
  if(safe) {
    fs.writeFileSync(usersPathSafe, jsonString, err => {
      if (err) {
        console.log('Error writing file', err)
        return false
      } else {
        console.log('Successfully wrote file')
        return true
      }
    })
  } else {
    fs.writeFileSync(usersPath, jsonString, err => {
      if (err) {
        console.log('Error writing file', err)
        return false
      } else {
        console.log('Successfully wrote file')
        return true
      }
    })
  }
}

const findOne = (username, safe) => {
  const users = getUsers(safe)
  if(Object.keys(users).includes(username) ) {
    return users[username]
  } else {
    return false
  }
}

const addOne = (username, password, safe) => {
  let users = getUsers(safe)
  users[username] = {username:username, password,password}
  const res = setUsers(users, safe)
  return res
}

module.exports = { getUsers, setUsers, findOne, addOne }