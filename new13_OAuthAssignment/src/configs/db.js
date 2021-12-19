const mongoose = require('mongoose')
module.exports = async () => {
 return mongoose.connect('mongodb://127.0.0.1:27017/test10')

}
