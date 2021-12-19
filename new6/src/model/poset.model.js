const mongoose = require('mongoose')

//post schema
const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    author:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    tags:[{type:mongoose.Schema.Types.ObjectId,ref:"tag",required:true}]
  },
  {
    versionKey: false,
    timestamps: true,
  }
)
//post scema connection
const Post = mongoose.model('post', postSchema)

module.exports = Post