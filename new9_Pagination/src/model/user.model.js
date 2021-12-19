const mongooose = require('mongoose')

const userSchema = new mongooose.Schema({
 first_name:{type:String,required:true},
 last_name:{type:String,required:true},
 age:{type:String,required:true},
 email:{type:String,required:true}
})

module.exports = mongooose.model('user',userSchema)