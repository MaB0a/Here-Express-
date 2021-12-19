const express = require('express')
const upload = require('../middleware/file-upload')
const router = express.Router()
const User = require('../model/user.model')
router.post('',upload.single('image_url'), async function (req, res) {
  const user = await User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    image_url: req.file.path,
   })
  //  return res.render('users/prP',{
  //   user:user
  //  })
  return res.send({user})
  })
  
router.get('',async function(req,res){
 const user = await User.find().lean().exec()
 return res.render('users/new',{
  user:user

 })
})
router.get('/patch', async function (req, res) {
  const user = await User.find().lean().exec()
  return res.render('users/ref', {
    user: user,
  })
})
router.get('/all', async function (req, res) {
  const user = await User.find().lean().exec()
  return res.render('users/prP', {
    user: user,
  })
})
router.get('/alls', async function (req, res) {
  const user = await User.find().lean().exec()
  return res.send({user})
})
router.patch('/:id',async function(req,res){
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
 return res.send({user})
})
router.delete('/:id', async function (req, res) {
  const user = await User.findByIdAndDelete(req.params.id, req.body)
  return res.send({ user })
})
module.exports = router
