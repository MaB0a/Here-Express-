const express = require('express')
const mongoose = require('mongoose')

const app = express()

const connect = () => {
  return mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
}

const userSchema = new mongoose.Schema({
  movie_name: String,
  budget: Number,
  movie_genre: String,
  production_year:Number,
})

const User = mongoose.model('user', userSchema)

app.get('/user', async(req, res) => {
  const user = await User.find({ movie_name: 'V for Vendetta' }).exec()
  console.log(user)
  res.status(200).json({ data: user })
})

const start = async () => {
  await connect()
  app.listen(2233, () => {
    console.log('listening to 2233')
  })
}
start()
