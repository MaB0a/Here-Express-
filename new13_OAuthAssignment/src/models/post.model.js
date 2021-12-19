const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: Number, required: true },
  role: [{ type: String, required: true }],
})

module.exports = mongoose.model('product', productSchema) // products
