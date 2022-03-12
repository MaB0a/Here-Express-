const mongoose = require('mongoose')

module.exports = () => {
 return mongoose.connect("mongodb+srv://Manney:9026724930@cluster.1o8px.mongodb.net/useAuth?retryWrites=true&w=majority")
}
