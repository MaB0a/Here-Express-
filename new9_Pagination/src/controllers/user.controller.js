const express = require('express')
const router = express.Router()
const User = require('../model/user.model')
const sendMail = require("../utils/sendmail")
router.get('', async function (req, res) {
  const page = +req.query.page || 1
  const size = +req.query.size || 10
  const offset = (page - 1) * size
  const users = await User.find().skip(offset).limit(size).lean().exec()
  const Total = await User.find().countDocuments()
  const total = Math.ceil(Total / size)

sendMail({
  from: 'maneyrocks@gmail.com',
  to: 'bakayarou@buta.com',
  subject: 'Message title',
  text: 'something',
  html: '<p>HTML bruh MVC word version bruh</p>',
})

  return res.send({ users, total })
})
router.post('', async (req, res) => {
  const user = await User.create(req.body)
  sendMail({
    from: 'maneyrocks@gmail.com',
    to: 'bakayarou@buta.com',
    subject: 'Message title',
    text: 'something',
    html: '<p>HTML bruh MVC word version bruh</p>',
  })

  return res.status(201).send({ user })

})
module.exports = router
