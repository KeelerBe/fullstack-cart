const assert = require('assert')
const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../index')
const utils = require('./utils')

const Product = mongoose.model('products')

describe('Inventory--', () => {
  let joe, thing1
  beforeEach((done) => {
    utils.createMockData()
      .then((data) => {
        [ joe,, thing1, ] = data
        done()
      })
  })

  it('handles GET request to /inventory/test', (done) => {
    request(app)
      .get('/inventory/test')
      .end((err, res) => {
        assert(res.body.success)
        done()
      })
  })

  it('fetches inventory for a given user id', (done) => {
    request(app)
      .get(`/users/${joe._id}/inventory`)
      .end((err, res) => {
        assert(res.body.length === 1)
        assert(res.body[0].productName === 'Thing 1')
        done()
      })
  })

  it('creates a new product for the current user', (done) => {
    const newProduct = {
      productName: 'Thingumajig',
      price: 4500,
      available: 7
    }
    request(app)
      .post(`/users/${joe._id}/inventory/products`)
      .send(newProduct)
      .end(() => {
        Product.find({})
          .then((products) => {
            assert(products.length === 3)
            assert(products.find(({ productName }) => 
              productName === 'Thingumajig'))
            done()
          })
      })
  })
})