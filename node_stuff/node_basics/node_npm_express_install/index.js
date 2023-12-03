const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello Shaurya')
  console.log('hello shaurya')
})

app.listen(3000)