const mongoose = require('mongoose')

const User = mongoose.model('users')
const Product = mongoose.model('products')

module.exports = {
  test(req, res) {
    res.send({ success: true })
  },

  fetchInventory(req, res, next) {
    const userId = req.params.userId

    User.findById(userId)
      .populate('inventoryProducts')
      .then((user) => res.send(user.inventoryProducts))
      .catch(next)
  },

  createProduct(req, res, next) {
    const userId = req.params.userId
    const productProps = req.body

    Promise.all([
      new Product(productProps).save(),
      User.findById(userId)
    ])
      .then((results) => {
        const [ product, user ] = results
        product.user = user
        return product.save()
      })
      .then((product) => res.send(product))
      .catch(next)
  },

  updateProduct(req, res, next) {
    const productId = req.params.productId
    const productProps = req.body
    // const userId = req.params.userId

    Product.findByIdAndUpdate(productId, productProps)
      .then((product) => res.send(product))
      .catch(next)
  },

  deleteProduct(req, res, next) {
    const productId = req.params.productId

    Product.findByIdAndDelete(productId)
      .then((product) => res.send(product))
      .catch(next)
  }
}

