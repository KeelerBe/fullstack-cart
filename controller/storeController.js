const mongoose = require('mongoose')
require('../models/productSchema')

const User = mongoose.model('users')
const Product = mongoose.model('products')

module.exports = {
  test(req, res) {
    res.send({ success: true })
  },

  fetchAllProducts(req, res, next) {
    Product.find({})
      .populate('user')
      .then((products) => res.send(products))
      .catch(next)
  },

  addToCart(req, res, next) {
    const userId = req.params.userId
    const productId = req.params.productId

    Promise.all([
      Product.findById(productId),
      User.findById(userId)
    ])
      .then((results) => {
        const [ product, user ] = results

        user.cartProducts.push(product)
        user.cartProductById[productId] = 1
        user.markModified('cartProductById')

        return user.save()
      })
      .then(() => res.send({ message: 'Product added to cart.' }))
      .catch(next)
  },

  fetchProduct(req, res, next) {
    const productId = req.params.productId

    Product.findById(productId)
      .populate('user')
      .then((product) => res.send(product))
      .catch(next)
  }
}