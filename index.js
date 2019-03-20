const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('colors')

const authRoutes = require('./routes/authRoutes')
const routes = require('./routes/routes')
require('./models/userSchema')

mongoose.connect('mongodb://localhost/pop-cart-dev', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
})

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
routes(app)
authRoutes(app)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => 
  console.log(`********** LISTENING ON PORT ${PORT} **********` .bgRed))

module.exports = app