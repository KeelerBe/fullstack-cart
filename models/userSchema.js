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

User.set('toObject', { virtuals: true })
User.set('toJSON', { virtuals: true })

module.exports = mongoose.model('users', User)

User.virtual('cartCount').get(function () {
  return Object.values(this.cartProductById).reduce((total, productCount) => {
    return total += productCount
  }, 0)
})

User.virtual('cartTotal').get(function () {
  return this.cartProducts.reduce((total, product) => {
    const productCount = this.cartProductById[product._id.toString()]
    return total += product.price * productCount
  }, 0)
})