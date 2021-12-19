const express = require('express')
const { body, validationResult } = require('express-validator')
const router = express.Router()

const Book = require('../model/book.model')
const User = require('../model/user.model')

router.post(
  '',
  body('pages').notEmpty(),
  // body('price').custom((value) => {
  //   if (value <= 0) throw new Error('price must be greater than zero')
  //   return true
  // }),
  // body('title')
  //   .isLength({ min: 5 })
  //   .withMessage('must be at least 5 characters long'),
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
    try {
      const book = await Book.create(req.body)
      return res.status(201).json({ book })
    } catch (err) {
      return res.status(400).send({ err: err.message })
    }
  }
)

router.patch(
  '/:bookId',
  body('author').custom(async (value, { req }) => {
    const book = await Book.findById(req.params.bookId).lean().exec()
      if (book.author != value) throw new Error('not you')
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
    try{
      const book = await Book.findByIdAndUpdate(req.params.bookId,req.body,{new:true})
      return res.status(201).json({book})
    }catch(err){
      return res.send({err:err.message})
    }
  }
)
module.exports = router
