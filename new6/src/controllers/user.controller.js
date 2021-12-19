const express = require('express')
const User = require('../model/user.model')
const Post = require('../model/poset.model')

const crudController = require('../controllers/crudController')
const router = express.Router()
// CRUD
router.post('', crudController.post(User))
router.get('', crudController.get(User))
router.patch('/:id', crudController.patch(User))
router.delete('/:id', crudController.deleteOne(User))
router.get('/:id', crudController.getOne(User))

module.exports = router
