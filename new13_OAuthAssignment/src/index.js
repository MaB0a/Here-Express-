const express = require('express');
const userController = require('./controller/user.controller')
const { register, login } = require('./controller/auth.controller')
const passport = require('./configs/passport')
const app = express();
app.use(passport.initialize())


passport.serializeUser(function({user,token}, done) {
    done(null, {user,token});
});              
       
passport.deserializeUser(function(user, done) {
      
 
        done(err, user);
    });           


app.get(
 '/auth/google',
 passport.authenticate('google', { scope: ['email', 'profile'] })
 )
 app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
   failureRedirect: '/auth/google/failure',
  }),
  function (req, res) {
   console.log('user 22', req.user)
   const { user, token } = req.user
   return res.status(200).json({ user, token })
  }
  )
  app.use(express.json())
  app.post('/register', register)
app.post('/login', login)
module.exports = {app}