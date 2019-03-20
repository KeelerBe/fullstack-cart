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

  it('POST request to /api/users creates a new user', (done) => {
    const bob = new User({
      givenName: 'Bob',
      familyName: 'Dude',
      email: 'bob@email.com'
    })
    
    bob.save()
      .then((user) => {
        request(app)
          .post('/api/users')
          .send(user)
          .end(() => {
            User.find({})
              .then((users) => {
                assert(users.length === 3)
                done()
              })
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

  it('PUT request to /api/users updates an existing user', (done) => {
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

  it('DELETE request to /api/users deletes an existing user', (done) => {
    request(app)
      .delete(`/api/users/${joe._id}`)
      .end((err, res) => {
        User.find({})
          .then((users) => {
            assert(users.length === 1)
            done()
          })
      })
  })
})