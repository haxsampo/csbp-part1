const jwt = require('jsonwebtoken')
const usersService = require('./dataReader')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

const tokenExtractor = (req, res, next) => {
  req.token = getTokenFrom(req)
  next()
}

const userExtractor = async (req, res, next) => {
  const token = getTokenFrom(req)
  if(token) {
    try{
      const decoToken = jwt.verify(token, process.env.SECRET)
      req.user =  usersService.findOne(decoToken.username, true)
    } catch(err) {
      next(err)
      return
    }
  }
  next()
}

module.exports = {
  tokenExtractor,
  userExtractor,
}