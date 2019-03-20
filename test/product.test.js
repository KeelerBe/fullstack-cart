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
      .then((results) => {
        [ joe,, thing1, ] = results
        done()
      })
  })

  it('handles GET request to /api/products/test', (done) => {
    request(app)
      .get('/api/products/test')
      .end((err, res) => {
        assert(res.body.success)
        done()
      })
  })

  it('GET request to /api/products fetches all products', (done) => {
    request(app)
      .get('/api/products')
      .end((err, res) => {
        assert(res.body.length === 2)
        done()
      })
  })

  it('POST request to /api/products creates a new product', (done) => {
    const thing3 = new Product({
      productName: 'Thing 3',
      price: 2500,
      available: 70,
      user: joe
    })

    request(app)
      .post('/api/products')
      .send(thing3)
      .end(() => {
        Product.find({})
          .then((products) => {
            assert(products.length === 3)
            done()
          })
      })
  })
})