const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const passport = require('passport')
require('colors')

const authRoutes = require('./routes/authRoutes')
const routes = require('./routes/routes')
const keys = require('./config/keys')
// require('./models/userSchema')
require('./models/productSchema')
require('./services/passport')

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/pop-cart-dev', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
}

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [keys.cookieKey]
}))
app.use(passport.initialize())
app.use(passport.session())

routes(app)
authRoutes(app)

app.use((err, req, res) => {
  app.status(422).send({ error: err.message })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => 
  console.log(`********** LISTENING ON PORT ${PORT} **********` .bgRed))

module.exports = app