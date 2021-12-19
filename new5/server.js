//REQ
const express = require('express')
const mongoose = require('mongoose')
//REQ
//CONNECT to the DATABASE
const connect = () => {
  return mongoose.connect('mongodb://127.0.0.1:27017/test1')
}
//CONNECT to the DATABASE
//SCHEMA for user
const userSchema = new mongoose.Schema({
  Id: { type: Number, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: false },
  email: { type: String, required: true },
  gender: { type: String, required: true },
})
//Connecting User SCHEMA
const User = mongoose.model('main', userSchema)

//schema for posts
const postSchema = mongoose.model(
  {
    title: { type: String, require: true },
    body: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'main',
      required: true,
    },
    tags: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tag',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)
//Connecting Post SCHEMA
const Post = mongoose.model('post', postSchema)
//schema for comment
const commentSchema = new mongoose.Schema(
  {
    body: { type: String, required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'post', required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)
//Connecting comment SCHEMA
const Comment = mongoose.model('comment', commentSchema)
//Schema for tags
const tagSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    post: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'tag', required: true },
    ],
  },
  {
    versionKey: false,
    // timestamps: true,
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  }
)
//Connecting tag SCHEMA
const Tag = mongoose.model('tag', tagSchema)
//Defining APP
const app = express()
//Defining APP

//CRUD
app.post('/users', async (req, res) => {
  const user = await User.create(req.body)
  return res.status(201).send({ user })
})
app.get('/users', async (req, res) => {
  const users = await User.find().lean().exec()
  return res.status(200).send({ users })
})
app.patch('/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  return res.status(200).send({ user })
})
app.delete('/users/:id', async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id)
  return res.status(200).send({ user })
})
app.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id).lean().exec()
  return res.status(200).send({ user })
})
//CRUD

//Defining app on what to use
app.use(express.json())
//Setting up a port
app.listen(5554, async function () {
  await connect()
  console.log('listening to radio 5554')
})
//CONNECT to the DATABASE
