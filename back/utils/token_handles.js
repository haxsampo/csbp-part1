const fs = require('fs')
const jwt = require('jsonwebtoken')

const tokenspath = './data/token_blacklist.json'
//const tokenspath = '../data/token_blacklist.json' //testing path

const getTokens = () => {
  const tokens = fs.readFileSync(tokenspath,'utf8')
  return JSON.parse(tokens)
}

const setTokens = (tokens) => {
  fs.writeFileSync(tokenspath, JSON.stringify(tokens), err => {
    if (err) {
      console.log('Error writing file', err)
      return false
    } else {
      console.log('Successfully wrote file')
      return true
    }
  })
}

const prune = () => {
  const timenow = Math.floor(Date.now() / 1000)
  let tokens = getTokens()
  const tokenslist = Object.keys(tokens)
  tokenslist.forEach(el => {
    if(timenow > tokens[el].exp) {
      delete tokens[el]
    }
  })
  setTokens(tokens)
}

const tokenInBlacklist = (token) => {
  const tokens = getTokens()
  let ret = false
  Object.keys(tokens).forEach(el => {
    if(token === el) {
      ret = true
    }
  })
  return ret
}

const addOne = (token) => {
  prune()
  let tokens = getTokens()
  const decoToken = jwt.verify(token, process.env.SECRET)
  tokens[token] = decoToken
  setTokens(tokens)
}

module.exports = {addOne, setTokens, getTokens, tokenInBlacklist}