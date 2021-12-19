const express = require('express')

const connect = require('./config/db')

const userController = require('./controllers/user.controller')
const postController = require('./controllers/post.controller')
const commentController = require('./controllers/comment.controller')
const tagController = require('./controllers/tag.controller')

const app = express()

app.use(express.json())

app.use('/users', userController)
app.use('/posts', postController)
app.use('/comments', commentController)
app.use('/tags', tagController)

app.listen(5553, async function () {
  await connect()
  console.log('listening on port ....5553')
})
