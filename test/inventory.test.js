const assert = require('assert')
const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../index')
const utils = require('./utils')

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
})