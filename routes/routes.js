const users = require('../controller/usersController')
const products = require('../controller/productsController')

module.exports = (app) => {
  app.get('/', (req, res) => res.send({ app: 'pop-cart' }))

  app.get('/api/users/test', users.test)
  app.post('/api/users', users.createUser)
  app.get('/api/users/:id', users.fetchUser)
  app.put('/api/users/:id', users.updateUser)
  app.delete('/api/users/:id', users.deleteUser)

  app.get('/api/products/test', products.test)
  app.post('/api/products', products.createProduct)
}