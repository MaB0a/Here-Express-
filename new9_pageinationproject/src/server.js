const connect = require('./config/db')

const { app } = require('./index')

app.listen(
  2346,
  (async () => {
    await connect()
    console.log('2346')
  })
)
