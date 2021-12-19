//requires passport npm package
const passport = require('passport')
//require user id and whatnot stored in env
require('dotenv').config()
//require google, just copid off passport npm web page
const GoogleStrategy = require('passport-google-oauth2').Strategy
//obviously User controller
const User = require('../model/user.model')
// a password generator, install a new npm package off net
const {v4:uuid} = require("uuid")
// a token generator from auth controller js page
const {newToken} = require("../controller/auth.controller")
//copied off passport page 
passport.use(
  new GoogleStrategy(
    {
      //dot env is used for this
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:2345/auth/google/callback',
      //mine works without this one, wierd
      // userProfileURL:"https://**www**.googleapis.com/oauth2/v3/userinfo",
      passReqToCallback: true,
    },
    //async fn to check request i think, from google auth
  async function (request, accessToken, refreshToken, profile, done) {
//email from google auth
      const email = profile?._json?.email
      //name from google auth
      const name = profile?._json?.name
      let user
    try {
      //to check if user is available  
          user = await User.findOne({email}).lean().exec()
          if (!user) {
            //if not, creates one
            user = await User.create({name:name,email:email,password:uuid()})
          }
          // console.log(user);
          //a new token for the user
          const token = newToken(user)
          //return a err which is null and token along with user
          return done(null,{user,token})
        } catch (error) {
          console.log(error);
        }
      // return done('user')
    }
  )
)

module.exports = passport
