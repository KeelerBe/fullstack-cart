const mongoose = require('mongoose')

const User = mongoose.model('users')
const Product = mongoose.model('products')

module.exports = {
  test(req, res) {
    res.send({ success: true })
  },

  fetchCart(req, res, next) {
    const userId = req.params.userId

    User.findById(userId)
      .populate('cartProducts')
      .then((user) => res.send(user))
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

  incrementQuantity(req, res, next) {
    const userId = req.params.userId
    const productId = req.params.productId

    User.findById(userId)
      .then((user) => {
        user.cartProductById[productId] += 1
        user.markModified('cartProductById')
        return user.save()
      })
      .then((user) => res.send({ message: 'Product quantity incremented.' }))
      .catch(next)
  },

  decrementQuantity(req, res, next) {
    const userId = req.params.userId
    const productId = req.params.productId

    User.findById(userId)
      .then((user) => {
        user.cartProductById[productId] -= 1
        user.markModified('cartProductById')
        return user.save()
      })
      .then((user) => res.send({ message: 'Product quantity decremented.' }))
      .catch(next)
  },

  removeFromCart(req, res, next) {
    const userId = req.params.userId
    const productId = req.params.productId

    User.findById(userId)
      .then((user) => {
        user.cartProducts.pull(productId)
        delete user.cartProductById[productId]
        user.markModified('cartProductById')
        return user.save()
      })
      .then((user) => res.send(user))
      .catch(next)
  }
}