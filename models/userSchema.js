const mongoose = require('mongoose')
const { Schema } = mongoose

const User = new Schema({
  googleID: String,
  givenName: String,
  familyName: String,
  email: String
})

module.exports = mongoose.model('users', User)