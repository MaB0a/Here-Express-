const express = require("express")

const User = require('../model/user.model')
const Post = require('../model/poset.model')
const Comment = require('../model/comment.model')
const Tag = require("../model/tag.module")
const crudController = require('../controllers/crudController')
const router = express.Router()

router.post('', crudController.post(Tag))
router.get('', crudController.get(Tag))
router.patch('/:id', crudController.patch(Tag))
router.delete('/:id', crudController.deleteOne(Tag))
router.get('/:id', crudController.getOne(Tag))
//CRUD
module.exports = router