const passport = require('passport')
 
module.exports = (app) => {
  app.get('/auth/google', 
    passport.authenticate('google', { scope: ['profile', 'email'] }))

  app.get('/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/')
    })
  
  app.get('/logout', (req, res) => {
    const user = req.user.givenName

    req.logout()
    res.send({ goodbye: user })
  })
}