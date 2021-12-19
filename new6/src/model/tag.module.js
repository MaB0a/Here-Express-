const mongoose = require('mongoose')

//tag schema
const tagSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)
//tag connect
const Tag = mongoose.model("tag",tagSchema)

module.exports = Tag