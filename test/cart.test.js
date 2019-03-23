const assert = require('assert')
const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../index')
const utils = require('./utils')

const User = mongoose.model('users')
const Product = mongoose.model('products')

describe('Cart--', () => {
  let joe, thing2
  beforeEach((done) => {
    utils.createMockData()
      .then((data) => {
        [ joe,,, thing2 ] = data
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
      .get(`/cart/users/${joe._id}`)
      .end((err, res) => {
        const { cartProducts, cartProductById, cartCount, cartTotal } = res.body
        
        assert(cartProducts[0].productName === 'Thing 2')
        assert(cartProductById[thing2._id] === 2)
        assert(cartCount === 2)
        assert(cartTotal === 10000)
        done()
      })
  })

  it('increments quantity for a given product id', (done) => {
    request(app)
      .put(`/cart/users/${joe._id}/products/${thing2._id}/increment`)
      .end(() => {
        User.findById(joe._id)
          .then((user) => {
            assert(user.cartProductById[thing2._id.toString()] === 3)
            done()
          })
      })
  })

  it('decrements quantity for a given product id', (done) => {
    request(app)
      .put(`/cart/users/${joe._id}/products/${thing2._id}/decrement`)
      .end(() => {
        User.findById(joe._id)
          .then((user) => {
            assert(user.cartProductById[thing2._id.toString()] === 1)
            done()
          })
      })
  })

  it('removes a product from the current user\'s cart', (done) => {
    request(app)
      .delete(`/cart/users/${joe._id}/products/${thing2._id}`)
      .end((err, res) => {
        User.findById(joe._id)
          .then((user) => {
            assert(user.cartProducts.length === 0)
            assert(Object.keys(user.cartProductById).length === 0)
            done()
          })
      })
  })
})