const assert = require('assert')
const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../index')
const utils = require('./utils')

const Product = mongoose.model('products')

describe('Products--', () => {
  let joe, thing1
  beforeEach((done) => {
    utils.createMockData()
      .then((data) => {
        [ joe,, thing1, ] = data
        done()
      })
  })

  it('handles GET request to /api/products/test', (done) => {
    request(app)
      .get('/products/test')
      .end((err, res) => {
        assert(res.body.success)
        done()
      })
  })

  it('fetches all products', (done) => {
    request(app)
      .get('/products')
      .end((err, res) => {
        assert(res.body.length === 2)
        done()
      })
  })

  it('creates a new product', (done) => {
    const thing3 = new Product({
      productName: 'Thing 3',
      price: 2500,
      available: 70,
      user: joe
    })

    request(app)
      .post('/products')
      .send(thing3)
      .end(() => {
        Product.find({})
          .then((products) => {
            assert(products.length === 3)
            done()
          })
      })
  })

  it('fetches a specific product for a given id', (done) => {
    request(app)
      .get(`/products/${thing1._id}`)
      .end((err, res) => {
        assert(res.body.productName === 'Thing 1')
        assert(res.body.user.givenName === 'Joe')
        done()
      })
  })

  it('updates an existing product for a given id', (done) => {
    request(app)
      .put(`/products/${thing1._id}`)
      .send({ available: 150 })
      .end(() => {
        Product.findById(thing1._id)
          .then((product) => {
            assert(product.available === 150)
            done()
          })
      })
  })

  it('deletes a product for a given id', (done) => {
    request(app)
      .delete(`/products/${thing1._id}`)
      .end(() => {
        Product.findById(thing1._id)
          .then((product) => {
            assert(product === null)
            done()
          })
      })
  })
})