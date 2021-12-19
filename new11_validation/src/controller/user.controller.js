const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const User = require('../model/user.model')

router.post(
  '',
  body('first_name')
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage('must be at least 5 characters long'),
  body('pincode')
    .notEmpty()
    .isLength({ min: 6, max: 6 })
    .withMessage('must be 6 characters long'),
  body('age').custom((value) => {
    if (value < 1 || value > 100) throw new Error('Dude you old')
  }),
  body('gender').custom((value) => {
    if (value != 'M' || value != 'F' || value != 'O')
      throw new Error('pick a correct one')
  }),
  body('email').isEmail(),
  body('last_name')
    .notEmpty()
    .custom((value, { req }) => {
      if (req.body.first_name == value) throw new Error('its same bruh')
      return true
    }),
  async function (req, res) {
    const errors = validationResult(req)
    let final = null

    if (!errors.isEmpty()) {
      final = errors.array().map((error) => {
        return {
          param: error.param,
          msg: error.msg,
        }
      })
      return res.status(400).json({ errors: final })
    }
    const user = await User.create(req.body)
    return res.send(user)
  }
)

module.exports = router
