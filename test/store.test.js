const assert = require('assert')
const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../index')
const utils = require('./utils')

const User = mongoose.model('users')
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
      .get('/store/test')
      .end((err, res) => {
        assert(res.body.success)
        done()
      })
  })

  it('fetches all products', (done) => {
    request(app)
      .get('/store/products')
      .end((err, res) => {
        assert(res.body.length === 2)
        done()
      })
  })

  it('adds a product on to the current user\'s cart', (done) => {
    const newProduct = new Product({
      productName: 'Thing 3',
      price: 3000,
      available: 2
    })

    newProduct.save()
      .then((product) => {
        request(app)
          .post(`/store/users/${joe._id}/cart/products/${product._id}`)
          .end((err, res) => {
            User.findById(joe._id)
              .then((user) => {
                assert(user.cartProducts.length === 2)
                assert(user.cartProductById[product._id] === 1)
                done()
              })
          })
      })
  })

  it('fetches a specific product for a given id', (done) => {
    request(app)
      .get(`/store/products/${thing1._id}`)
      .end((err, res) => {
        assert(res.body.productName === 'Thing 1')
        assert(res.body.user.givenName === 'Joe')
        done()
      })
  })

  // it('updates an existing product for a given id', (done) => {
  //   request(app)
  //     .put(`/products/${thing1._id}`)
  //     .send({ available: 150 })
  //     .end(() => {
  //       Product.findById(thing1._id)
  //         .then((product) => {
  //           assert(product.available === 150)
  //           done()
  //         })
  //     })
  // })

  // it('deletes a product for a given id', (done) => {
  //   request(app)
  //     .delete(`/products/${thing1._id}`)
  //     .end(() => {
  //       Product.findById(thing1._id)
  //         .then((product) => {
  //           assert(product === null)
  //           done()
  //         })
  //     })
  // })
})