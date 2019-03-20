const mongoose = require('mongoose')
require('../models/productSchema')

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

  createProduct(req, res, next) {
    const productProps = req.body

    new Product(productProps).save()
      .then((product) => res.send(product))
      .catch(next)
  },

  fetchProduct(req, res, next) {
    const productId = req.params.id

    Product.findById(productId)
      .populate('user')
      .then((product) => res.send(product))
      .catch(next)
  },

  updateProduct(req, res, next) {
    const productId = req.params.id
    const productProps = req.body

    Product.findByIdAndUpdate(productId, productProps)
      .then((product) => res.send(product))
      .catch(next)
  },

  deleteProduct(req, res, next) {
    const productId = req.params.id

    Product.findByIdAndDelete(productId)
      .then((product) => res.send(product))
      .catch(next)
  }
}