const express = require('express')
const mongoose = require('mongoose')
require('colors')

mongoose.connect('mongodb://localhost/pop-cart-dev', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
})

const app = express()

const PORT = process.env.PORT || 5000
app.listen(PORT, () => 
  console.log(`********** LISTENING ON PORT ${PORT} **********` .bgRed))

module.exports = app