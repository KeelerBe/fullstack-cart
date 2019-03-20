const assert = require('assert')
const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../index')
const utils = require('./utils')

const User = mongoose.model('users')

describe('Users--', () => {
  let joe
  beforeEach((done) => {
    utils.createMockData()
      .then((results) => {
        [ joe,,, ] = results
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

  it('creates a new user', (done) => {
    const bob = new User({
      givenName: 'Bob',
      familyName: 'Dude',
      email: 'bob@email.com'
    })
    
    request(app)
      .post('/api/users')
      .send(bob)
      .end(() => {
        User.find({})
          .then((users) => {
            assert(users.length === 3)
            done()
          })
      })
  })

  it('fetches a specific user for a given id', (done) => {
    request(app)
      .get(`/api/users/${joe._id}`)
      .end((err, res) => {
        const { cartProducts, inventoryProducts, givenName } = res.body

        assert(cartProducts[0].productName === 'Thing 2')
        assert(inventoryProducts[0].productName === 'Thing 1')
        assert(givenName === 'Joe')
        done()
      })
  })

  it('updates an existing user for a given id', (done) => {
    request(app)
      .put(`/api/users/${joe._id}`)
      .send({ familyName: 'Cooler' })
      .end(() => {
        User.findById(joe._id)
          .then((user) => {
            assert(user.familyName === 'Cooler')
            done()
          })
      })
  })

  it('deletes an existing user for a given id', (done) => {
    request(app)
      .delete(`/api/users/${joe._id}`)
      .end((err, res) => {
        User.findById(joe._id)
          .then((user) => {
            assert(user === null)
            done()
          })
      })
  })
})