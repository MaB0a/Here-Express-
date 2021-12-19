const mongoose = require('mongoose')

//comments schema
const commentSchema = new mongoose.Schema(
  {
    body: { type: String, required: true },
    post:{type:mongoose.Schema.Types.ObjectId,ref:"post",required:true}
  },
  {
    versionKey: false,
    timestamps: true,
  }
)
//comment connect
const Comment = mongoose.model("comment",commentSchema)

module.exports = Comment