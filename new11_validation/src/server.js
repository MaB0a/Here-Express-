const app = require('./index')
const connect = require('./configs/db')

app.listen(3456, async function () {
  await connect()
  console.log('3456')
})
