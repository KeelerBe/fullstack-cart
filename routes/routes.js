module.exports = (app) => {
  app.get('/', (req, res) => res.send({ app: 'pop-cart' }))
}