const mongoose = require('mongoose')

module.exports = {
  test(req, res) {
    res.send({ success: true })
  }
}