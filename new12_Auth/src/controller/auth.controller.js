const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../model/user.model')

//create token
const newToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET_KEY)
}

//register syndrome
const register = async (req, res) => {
  let user
  try {
    //first check user if exist already
    user = await User.findOne({ email: req.body.email })
    //if yes send error message
    if (user) return res.status(400)
            .send({ message: 'please check your username and password' })
    //else create user with email and password
    //hashin the password?
    user = await User.create(req.body)
    //we will create a token
    const token = newToken(user)
    //we will send the token to the frontend
    return res.status(200).send({ user, token })
    
  } catch (err) {
    return res.status(500).send({ message: 'sorry' })
  }
}

const login = async (req, res) => {
  try {
    //first check is email exists
    const user = await User.findOne({ email: req.body.email })
    //if not we throw an error
    if (!user) return res.status(400).send({ message: 'please check your username and password' })
    //if yes, then match password
    let match = user.checkPassword(req.body.password)
    //if password doesnt match, throw an error
    if (!match) return res.status(400).send({ message: 'please check your username and password' })
    //else we will create a new token for that user
    const token = newToken(user)
    //we will send the token to the frontend
    return res.status(200).send({ user, token })
  } catch (err) {
    return res.status(500).send({ message: 'sorry' })
  }
}

module.exports = { register, login }
