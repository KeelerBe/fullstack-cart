const mongoose = require('mongoose')

const User = mongoose.model('users')

module.exports = {
  test(req, res) {
    res.send({ success: true })
  },

  fetchInventory(req, res, next) {
    const userId = req.params.userId

    User.findById(userId)
      .populate('inventoryProducts')
      .then((user) => res.send(user.inventoryProducts))
      .catch(next)
  }
}