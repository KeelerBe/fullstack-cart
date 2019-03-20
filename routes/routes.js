const users = require('../controller/usersController')

module.exports = (app) => {
  app.get('/', (req, res) => res.send({ app: 'pop-cart' }))

  app.get('/api/users/test', users.test)
  app.get('/api/users/:id', users.fetchUser)
}