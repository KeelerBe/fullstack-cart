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
  app.post('/store/users/:userId/cart/products/:productId', store.addToCart)   

  app.get('/cart/test', cart.test)
  app.get('/users/:userId/cart', cart.fetchCart)
  app.put('/users/:userId/cart/products/:productId/increment', cart.incrementQuantity)
  app.put('/users/:userId/cart/products/:productId/decrement', cart.decrementQuantity)
  app.delete('/users/:userId/cart/products/:productId', cart.removeFromCart)

  app.get('/inventory/test', inventory.test)
  app.get('/users/:userId/inventory', inventory.fetchInventory)
  // app.post('/products', store.createProduct)
  // app.put('/products/:productId', store.updateProduct)
  // app.delete('/products/:productId', store.deleteProduct)
}