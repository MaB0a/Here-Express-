const express = require("express")
const User = require('../model/user.model')
const Post = require('../model/poset.model')
const Comment = require('../model/comment.model')
const Tag = require('../model/tag.module')
const crudController = require('../controllers/crudController')
const router = express.Router()

router.post('', crudController.post(Comment))
router.get('', crudController.get(Comment))
router.patch('/:id', crudController.patch(Comment))
router.delete('/:id', crudController.deleteOne(Comment))
router.get('/:id', crudController.getOne(Comment))


module.exports = router