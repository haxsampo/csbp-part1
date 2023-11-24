const express = require('express')
const app = express()
const cors = require('cors')
const loginRouter = require('./routes/login')
const userRouter = require('./routes/users')
const middleware = require('./utils/middleware')

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)
app.use('/api/login', loginRouter)
app.use('/api/user', userRouter)

module.exports = app