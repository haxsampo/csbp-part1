
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()
const loginRouter = require('express').Router()
const usersService = require('../utils/dataReader')
const logger = require('../utils/logger')
const hf = require('../utils/helperfuncs')
const th = require('../utils/token_handles')

loginRouter.post('/', async (req, res)=> {
  //SAFE LOGIN
  const { username, password } = req.body
  const user = usersService.findOne(username, true)

  if(!hf.isEmpty(req.user) && req.user.username != username) {
    logger.error(`Token associated username, ${req.user.username}, doesn't match given username, ${username}, in login.`)
    th.addOne(req.token)
  }

  const corrPass = user === false
    ? false
    : await bcrypt.compare(password, user.password)

  if (!(user && corrPass)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }
  const userForToken = {
    username: username
  }

  const token = jwt.sign(userForToken,
    process.env.SECRET,
    {expiresIn:60*60})
  
    res.status(200).send({
      token,
      username:username,
    })
})

module.exports = loginRouter