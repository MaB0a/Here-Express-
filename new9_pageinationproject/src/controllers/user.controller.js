const express = require('express')
const router = express.Router()
const User = require('../model/user.model')
const sendMail = require('../utils/sendmail')

router.get('', async (req, res) => {
  const page = +req.query.page || 1
  const size = +req.query.size || 10
  const offset = (page - 1) * size
  const user = await User.find().skip(offset).limit(size).lean().exec()
  const Totes = await User.find().countDocuments()
  const totes = Math.ceil(Totes / size)

  return res.send({ user, totes })
})

router.post('', async (req, res) => {
 const user = await User.create(req.body)

 sendMail({
   from: 'maneyrocks@gamil.com',
   to: user.email,
   subject: 'Welcome to ABC system'+ user.first_name+user.last_name,
   text: `Hi ${user.first_name}, Please confirm your email address`,
   html: '',
 })
  sendMail({
    from: 'sysADMIN@gamil.com',
    to: 'a@mail.com,b@mail.com,c@mail.com,d@mail.com,e@mail.com',
    subject: `${user.first_name} ${user.last_name} has registered with us`,
    text: `Please welcome ${user.first_name} ${user.last_name}`,
    html: '',
  })
 return res.status(201).send({user})
})
module.exports = router