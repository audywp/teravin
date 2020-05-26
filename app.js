const express = require('express')
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false })) //parsing data from urlencoded
app.use(bodyParser.json()) // parsing data from JSON

const port = process.env.PORT
app.listen(port || 3000, function () {
  console.log(`Listening port ${port}`)
})