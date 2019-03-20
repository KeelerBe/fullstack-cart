const mongoose = require('mongoose')
require('../models/userSchema')

const User = mongoose.model('users')

module.exports = {
  test(req, res) {
    res.send({ success: true })
  },

  createUser(req, res, next) {
    const userProps = req.body
    new User(userProps).save()
      .then((user) => res.send(user))
      .catch(next)
  },

  fetchUser(req, res, next) {
    const userId = req.params.id

    User.findById(userId)
      .populate([{ path: 'cartProducts' }, { path: 'inventoryProducts' }])
      .then((user) => res.send(user))
      .catch(next)
  }
}