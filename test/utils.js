const mongoose = require('mongoose')

const User = mongoose.model('users')
const Product = mongoose.model('products')

const createMockData = () => {
  const joe = new User({
    givenName: 'Joe',
    familyName: 'Cool',
    email: 'joe@email.com',
  })

  const jen = new User({
    givenName: 'Jen',
    familyName: 'Fab',
    email: 'jen@email.com',
  })

  const thing1 = new Product({
    productName: 'Thing 1',
    price: 1000,
    available: 50
  })

  const thing2 = new Product({
    productName: 'Thing 2',
    price: 5000,
    available: 20
  })

  // joe is the vendor of thing1
  joe.inventoryProducts.push(thing1)

  // jen is the vendor of thing2
  jen.inventoryProducts.push(thing2)

  // joe buys 2 items of thing2
  joe.cartProducts.push(thing2)
  joe.cartProductById[thing2._id.toString()] = 2

  // jen buys 3 items of thing1
  jen.cartProducts.push(thing1)
  jen.cartProductById[thing1._id.toString()] = 3

  thing1.user = joe
  thing2.user = jen

  return Promise.all([
    joe.save(),
    jen.save(),
    thing1.save(),
    thing2.save()
  ])
    .then((results) => results)
}

module.exports = {
  createMockData
}