const mongoose = require('mongoose')
const { Schema } = mongoose

const User = new Schema({
  googleID: String,
  givenName: String,
  familyName: String,
  email: String,
  cartProducts: [{
    type: Schema.Types.ObjectId,
    ref: 'products'
  }],
  cartProductById: {
    type: Schema.Types.Mixed,
    default: {}
  },
  inventoryProducts: [{
    type: Schema.Types.ObjectId,
    ref: 'products'
  }]
}, { minimize: false })

module.exports = mongoose.model('users', User)