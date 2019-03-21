const assert = require('assert')
const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../index')
const utils = require('./utils')

describe('Cart--', () => {
  let joe
  beforeEach((done) => {
    utils.createMockData()
      .then((results) => {
        [ joe,,, ] = results
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
})