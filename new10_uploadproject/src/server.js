const app = require("./index")
const connect = require("./configs/db")

app.listen(2346,async function(){
 await connect()
 console.log('2346');
})