const mongoose = require('mongoose')
const { Schema } = mongoose

const Product = new Schema({
  productName: String,
  price: Number,
  available: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
})

module.exports = mongoose.model('products', Product)