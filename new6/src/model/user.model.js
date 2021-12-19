const mongoose = require('mongoose')

// Step1
const userSchema = new mongoose.Schema({
  id: { type: Number, required: false },
  first_name: { type: String, required: true },
  last_name: { type: String, required: false },
  email: { type: String, required: true },
  gender: { type: String, required: true },
})
// Step2
const User = mongoose.model('user', userSchema)

module.exports = User