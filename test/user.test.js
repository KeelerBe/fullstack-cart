const assert = require('assert')
const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../index')

const User = mongoose.model('users')

describe('Users --', () => {
  it('handles GET request to /api/users/test', (done) => {
    request(app)
      .get('/api/users/test')
      .end((err, res) => {
        assert(res.body.success)
        done()
      })
  })
})