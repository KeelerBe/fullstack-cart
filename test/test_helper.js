const mongoose = require('mongoose')

before((done) => {
  mongoose.connect('mongodb://localhost/pop-cart-test', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })

  mongoose.connection
    .once('open', () => done())
    .on('error', (error) => console.log('Error: ', error))
})

beforeEach((done) => {
  const { users, products } = mongoose.connection.collections

  Promise.all([
    users.drop(),
    products.drop()
  ])
    .then(() => done())
    .catch(() => done())
})