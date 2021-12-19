const express = require("express")
const User = require('../model/user.model')
const Post = require('../model/poset.model')
const Comment = require('../model/comment.model')
const Tag = require('../model/tag.module')
const router = express.Router()
//posts per author
// router.get('/users/:id/posts', async (req, res) => {
//   const posts = await Post.find({ author: req.params.id }).lean().exec()
//   const author = await User.findById(req.params.id).lean().exec()
//   return res.status(200).send({ posts, author })
// })

//post creation
router.post('', async (req, res) => {
  const posts = await Post.create(req.body)
  return res.status(201).send({ posts })
})
//getting all posts
router.get('', async (req, res) => {
  const posts = await Post.find()
    .populate({ path: 'author', select: 'first_name' })
    .populate('tags')
    .lean()
    .exec()
  return res.status(200).send({ posts })
})
//get a single post
router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id).lean().exec()
  return res.status(200).send({ post })
})
//update a single post
router.patch('/:id', async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .lean()
    .exec()
  return res.status(200).send({ post })
})
//delete a single post
router.delete('/:id', async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id).lean().exec()
  return res.status(200).send({ post })
})
//get all comments for a post
router.get("/:id/comments",async(req,res)=>{
const comments = await Comment.find({post:req.params.id}).lean().exec()
const post = await Post.findById(req.params.id);
return res.status(200).send({comments,post})
})
module.exports = router