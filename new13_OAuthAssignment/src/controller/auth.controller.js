const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/user.model')
const newToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET_KEY)
}

const register = async (req, res) => {
  let user
  try {
    user = await User.findOne({ email: req.body.email })

    if (!user) {
      return res
        .status(400)
        .send({ message: 'please check you email and password' })
    }
    user = await User.create(req.body)
    const token = newToken(user)
    return res.status(200).send({ user, token })
  } catch (error) {
    return res.status(500).send({ message: 'sorry' })
  }
}
const login = async (req, res) => {
  try {
    //first check is email exists
    const user = await User.findOne({ email: req.body.email })
    //if not we throw an error
    if (!user) {
     return res
     .status(400)
     .send({ message: 'please check your username and password' })
    }
    //if yes, then match password
    let match = user.checkPassword(req.body.password)
    //if password doesnt match, throw an error
    if (!match)
    return res
    .status(400)
    .send({ message: 'please check your username and password' })
    console.log(user)
    //else we will create a new token for that user
    const token = newToken(user)
    //we will send the token to the frontend
    return res.status(200).send({ user, token })
  } catch (err) {
    return res.status(500).send({ message: 'storry' })
  }
}

module.exports = { register, login, newToken }
