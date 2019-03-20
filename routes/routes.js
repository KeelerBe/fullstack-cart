const users = require('../controller/usersController')

module.exports = (app) => {
  app.get('/', (req, res) => res.send({ app: 'pop-cart' }))

  app.get('/api/users/test', users.test)
  app.post('/api/users', users.createUser)
  app.get('/api/users/:id', users.fetchUser)
  app.put('/api/users/:id', users.updateUser)
  app.delete('/api/users/:id', users.deleteUser)
}