const assert = require('assert')
const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../index')
const utils = require('./utils')

describe('Cart--', () => {
  let joe, thing2
  beforeEach((done) => {
    utils.createMockData()
      .then((results) => {
        [ joe,,, thing2 ] = results
        done()
      })
  })

  it('handles GET request to /api/cart/test', (done) => {
    request(app)
      .get('/cart/test')
      .end((err, res) => {
        assert(res.body.success)
        done()
      })
  })

  it('fetches a cart for a given user id', (done) => {
    request(app)
      .get(`/users/${joe._id}/cart`)
      .end((err, res) => {
        const { cartProducts, cartProductById } = res.body

        assert(cartProducts[0].productName === 'Thing 2')
        assert(cartProductById[thing2._id] === 2)
        done()
      })
  })
})