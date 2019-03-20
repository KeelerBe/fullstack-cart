const mongoose = require('mongoose')
require('../models/productSchema')

const Product = mongoose.model('products')

module.exports = {
  test(req, res) {
    res.send({ success: true })
  },

  createProduct(req, res, next) {
    const productProps = req.body

    new Product(productProps).save()
      .then((product) => res.send(product))
      .catch(next)
  }
}