require('dotenv').config({path: '../.env'})

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// require('dotenv').config()

// const id = process.env.GOOGLE_CLIENT_ID;
// const sec = process.env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'https://api-web-m5lb.onrender.com/auth/google/callback'
},
function(accessToken, refreshToken, profile, done) {
  return done(null, profile);
}  
));

// Serialización del usuario para almacenar en la sesión
passport.serializeUser(function(user, done) {
  done(null, user);
});

// Deserialización del usuario para recuperar de la sesión
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

module.exports = {

};
