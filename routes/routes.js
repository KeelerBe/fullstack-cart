const users = require('../controller/usersController')
const store = require('../controller/storeController')
const cart = require('../controller/cartController')
const inventory = require('../controller/inventoryController')

module.exports = (app) => {
  app.get('/', (req, res) => res.send({ app: 'pop-cart' }))

  app.get('/users/test', users.test)
  app.post('/users', users.createUser)
  app.get('/users/:userId', users.fetchUser)
  app.put('/users/:userId', users.updateUser)
  app.delete('/users/:userId', users.deleteUser)

  app.get('/store/test', store.test)
  app.get('/store/products', store.fetchAllProducts)
  app.get('/store/products/:productId', store.fetchProduct)
  app.post('/store/users/:userId/products/:productId', store.addToCart)   

  app.get('/cart/test', cart.test)
  app.get('/cart/users/:userId', cart.fetchCart)
  app.put('/cart/users/:userId/products/:productId/increment', cart.incrementQuantity)
  app.put('/cart/users/:userId/products/:productId/decrement', cart.decrementQuantity)
  app.delete('/cart/users/:userId/products/:productId', cart.removeFromCart)

  app.get('/inventory/test', inventory.test)
  app.get('/inventory/users/:userId', inventory.fetchInventory)
  app.post('/inventory/users/:userId/products', inventory.createProduct)
  app.put('/inventory/products/:productId', inventory.updateProduct)
  app.delete('/inventory/products/:productId', inventory.deleteProduct)
}