const passport = require('passport');

require('dotenv').config();

const GoogleStrategy = require('passport-google-oauth2').Strategy

const User = require("../models/user.model")

const {v4:uuid} = require("uuid")

const {newToken} = require("../controller/auth.controller")

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:2345/auth/google/callback',
      // userProfileURL:"https://**www**.googleapis.com/oauth2/v3/userinfo",
      passReqToCallback: true,
    },
   async function (request, accessToken, refreshToken, profile, done) {
    const email = profile?._json?.email
    const name = profile?._json?.name
    let  user
    try {
     user = await User.findOne({email}).lean().exec()
     if (!user) {
      user = await User.create({name:name,email:email,password:uuid()})
     }
     const token = newToken(user)
     console.log(user)
     return done(null,{user,token})
      } catch (error) {
       console.log(error);
      }
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      // return done(err, user)
      // })
    }
  )
)
module.exports = passport