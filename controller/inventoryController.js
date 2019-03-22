const mongoose = require('mongoose')

const User = mongoose.model('users')

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
  }

  // createProduct(req, res, next) {
  //   const productProps = req.body

  //   new Product(productProps).save()
  //     .then((product) => res.send(product))
  //     .catch(next)
  // },

  // updateProduct(req, res, next) {
  //   const productId = req.params.productId
  //   const productProps = req.body

  //   Product.findByIdAndUpdate(productId, productProps)
  //     .then((product) => res.send(product))
  //     .catch(next)
  // },

  // deleteProduct(req, res, next) {
  //   const productId = req.params.productId

  //   Product.findByIdAndDelete(productId)
  //     .then((product) => res.send(product))
  //     .catch(next)
  // }
}

