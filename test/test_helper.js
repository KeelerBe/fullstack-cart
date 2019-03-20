const mongoose = require('mongoose')

before((done) => {
  mongoose.connect('mongodb://localhost/pop-cart-test', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })

  mongoose.connection
    .once('open', () => done())
    .on('error', () => console.log('Error: ', error))
})

beforeEach((done) => {
  const { users } = mongoose.connection.collections

  users.drop()
    .then(() => done())
    .catch(() => done())
})