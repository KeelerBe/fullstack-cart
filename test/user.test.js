const assert = require('assert')
const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../index')
const utils = require('./utils')

const User = mongoose.model('users')

describe('Users --', () => {
  let joe, jen, thing1, thing2
  beforeEach((done) => {
    utils.createMockData()
      .then((results) => {
        [ joe, jen, thing1, thing2 ] = results
        done()
      })
  })

  it('handles GET request to /api/users/test', (done) => {
    request(app)
      .get('/api/users/test')
      .end((err, res) => {
        assert(res.body.success)
        done()
      })
  })
})