const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  title: { type: String, require: true },
  price: { type: Number, require: true },
  pages: { type: Number, require: true },
  editions: { type: Number, require: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'user', require: true },
})
module.exports = mongoose.model('book', bookSchema)
