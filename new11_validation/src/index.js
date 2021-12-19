const express = require('express')
const bookController = require('./controller/book.controller')
const usersController = require('./controller/user.controller')
const app = express()
app.use(express.json())
app.use("/books",bookController)
app.use('/users', usersController)

module.exports = app
