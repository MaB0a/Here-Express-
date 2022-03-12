const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const User = require('../model/user.model')

router.post(
  '',
  body('name').notEmpty().isLength({ min: 5 }).withMessage('must be at least 5 characters long'),
  body('email').isEmail().notEmpty(),
  async function (req, res) {
    const errors = validationResult(req)
    let final = null

    if (!errors.isEmpty()) {  final = errors.array().map((error) => {
        return { param: error.param, msg: error.msg, } })
      return res.status(400).json({ errors: final })
    }
    const user = await User.create(req.body)
     delete user.password
    return res.send(user)
  }
)
