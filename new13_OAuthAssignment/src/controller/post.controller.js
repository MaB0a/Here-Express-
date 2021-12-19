const express = require('express');
const router = express.Router()
const Post = require('../models/post.model')
const authenticate = require('../middleware/authenticate')

const authorize = require('../middleware/authorize')

router.get("/",authenticate,authorize([email]),async function(req, res) {
const post = await Post.find({email})
})