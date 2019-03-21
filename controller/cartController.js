const mongoose = require('mongoose')

const User = mongoose.model('users')
const Product = mongoose.model('products')

module.exports = {
  test(req, res) {
    res.send({ success: true })
  },

  addToCart(req, res, next) {},

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

  updateQuantity(req, res, next) {},
  removeFromCart(req, res, next) {}
}