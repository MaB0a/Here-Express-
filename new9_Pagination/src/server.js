const connect = require('./config/db')

const {app} = require("./index")

app.listen(2345,async function(){
 await connect();
 console.log('2345');
})