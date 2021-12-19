const express = require('express')
const userController = require('./controller/user.controller')
const app = express()
app.use(express.json())
app.set('view engine', 'ejs')
app.use('/user', userController)
module.exports = app
