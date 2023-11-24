const userRouter = require('express').Router()
const usersService = require('../utils/dataReader')
const bcrypt = require('bcrypt')
const cpass = require('../utils/commonpasswords')
const logger = require('../utils/logger')
const th = require('../utils/token_handles')

userRouter.get('/:id', async (req, res) => {
  // Authorization requirement for getting userinformation &
   /* if (!req.token || !(req.params.id ===req.user.username) ) {
    if(!req.token) {
      logger.error("no token")
    }
    if(!(req.params.id ===req.user.username)) {
      logger.error(`${req.params.id} != ${req.user.username}, in userRouter get`)
    }
    if(th.tokenInBlacklist(req.token)) {
      logger.error(`userinfo get attempt with blacklisted token - ${req.token}`)
    }
    return res.status(401).json({error:"invalid token"})
  }  */
  const user = usersService.findOne(req.params.id, true)
  res.json(user)
})

userRouter.get('/', async (req, res)=> {
  const {password, admin} = req.body
  if(admin && password === 'hardcoded_password'){
    const users = usersService.getUsers(true)
    res.json(users)
  }
  /* const user = usersService.findOne('admin', true)
  const corrPass = user === false
    ? false
    : await bcrypt.compare(password, user.password)

  if(admin && corrPass) {
    const users = usersService.getUsers(true)
    res.json(users)
  } */
}) 

userRouter.post('/', async (req, res) => {
  const {username, password, safe} = req.body
  const exists = usersService.findOne(username, true)
  // password requirements
  /* const err = []
  if (exists) {
    err.push("username already exists")
  }
  if(password.length<8 && password.length>50) {
    err.push("password length needs to be within 8 - 50")
  }
  if(cpass.passwords.includes(password)) {
    err.push("password in common passwords list, please use another")
  } 
  if( password.includes(username) ) {
    err.push("password ought not to include username")
  }
  if(String.prototype.concat.call(...new Set(password)).length<5 ) {
    err.push("please use more unique characters")
  }
  if(err.length > 0) {
    logger.error(err)
    res.status(400).json({"error":err})
    return
  } */
  
  const saltrounds = 10
  const passwordHash = await bcrypt.hash(password, saltrounds)

  let fsres = ''
  if(safe) {
    fsres = usersService.addOne(username, passwordHash, safe)
  } else {
    fsres = usersService.addOne(username, password, safe)
  }
  
  if (fsres) {
    res.status(201).json({username:username})
  } else {
    res.status(400)
  }
})

module.exports = userRouter