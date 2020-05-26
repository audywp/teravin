const express = require('express')
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')


app.use(bodyParser.urlencoded({ extended: false })) //parsing data from urlencoded
app.use(bodyParser.json()) // parsing data from JSON
app.use(cors('*'))
//component routes
const Router = require('./src/route/User.js')


//routes
app.use('/user', Router)

app.get('/migrate', function (req, res) {
  require('./src/migration/User')
  const data = {
    msg: 'Table Users Created !'
  }
  res.send(data)
})

const port = process.env.PORT
app.listen(port, function () {
  console.log(`Listening port ${port}`)
})