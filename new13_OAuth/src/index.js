const express = require('express');
//took passport from page
const passport = require('./configs/passport');
//for auths
const {register,login}= require("./controller/auth.controller")
const productController = require('./controller/product.controller')
const userController = require('./controller/user.controller')
const postController = require('./controller/post.controller')

const app = express();

//passport needs to be initaialized
app.use(passport.initialize())
// a serializer and deserializer to something stringify or destringify the content
passport.serializeUser(function({user,token},done){
 //remember output to be in same form
 done(null, { user, token })
})
passport.deserializeUser(function(user,done){
 done(err,user);
})
//to authorizee, user is sent to this link
app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
)
// a callback link to redirect user to another page or back to main page
app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    // successRedirect: '/auth/google/success',
    // a failure redirect can also be created with app.get
    failureRedirect: '/auth/google/failure',
    //technically a success redirect
  }),function(req,res){
   console.log("user 22",req.user);
   const {user,token} = req.user
   return res.status(200).json({user,token})
  }
)
app.use(express.json());
app.post("/register",register)
app.post("/login",login)
app.use('/products', productController)
app.use('/post',postController)


module.exports = {app};