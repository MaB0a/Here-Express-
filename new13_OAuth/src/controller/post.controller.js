const express = require('express')
const { body, validationResult } = require('express-validator')
const router = express.Router()

const Post = require('../model/Post.model')
const authenticate = require('../middlewares/authenticate')

router.post('', async function (req, res) {
  const post = await Post.create(req.body)
  return res.status(201).json({ post })
})
router.get('/', authenticate, async function (req, res) {
  const post = await Post.find().lean().exec()
  const user = req.user

  delete user.password
  return res.send({ post, user })
})
module.exports = router
