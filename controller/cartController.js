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
      .then((user) => {
        const { cartProducts, cartProductById } = user
        res.send({ cartProducts, cartProductById })
      })
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
        user.cartProductById[product._id.toString()] = 1
        user.markModified('cartProductById')
        // user.cartProductById.something = 1
        return user.save()
      })
      .then(() => res.send({ message: 'Product added to cart.' }))
      .catch(next)
  },

  updateQuantity(req, res, next) {},
  removeFromCart(req, res, next) {}
}