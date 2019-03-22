const users = require('../controller/usersController')
const products = require('../controller/productsController')
const cart = require('../controller/cartController')
const inventory = require('../controller/inventoryController')

module.exports = (app) => {
  app.get('/', (req, res) => res.send({ app: 'pop-cart' }))

  app.get('/users/test', users.test)
  app.post('/users', users.createUser)
  app.get('/users/:userId', users.fetchUser)
  app.put('/users/:userId', users.updateUser)
  app.delete('/users/:userId', users.deleteUser)

  app.get('/products/test', products.test)
  app.get('/products', products.fetchAllProducts)
  app.post('/products', products.createProduct)
  app.get('/products/:productId', products.fetchProduct)
  app.put('/products/:productId', products.updateProduct)
  app.delete('/products/:productId', products.deleteProduct)

  app.get('/cart/test', cart.test)
  app.get('/users/:userId/cart', cart.fetchCart)
  app.post('/users/:userId/cart/products/:productId', cart.addToCart)
  app.put('/users/:userId/cart/products/:productId/increment', cart.incrementQuantity)
  app.put('/users/:userId/cart/products/:productId/decrement', cart.decrementQuantity)
  app.delete('/users/:userId/cart/products/:productId', cart.removeFromCart)

  app.get('/inventory/test', inventory.test)
}