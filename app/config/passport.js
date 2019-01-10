const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../models/user');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy((username, password, done) => {
      // Match user
      console.log('Authenticating ' + username + ' with password ' + password);
      let user = {username: username, password: password};

      User.login(user, 
        (results) => {
          if (results.length === 1) {
            console.log('Logging in..');
            return done(null, results[0]);
          } 
        },
        () => {
          return done(null, false, {error: true, message: 'Password incorrect'});
        }
      );
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    User.getUser(user.id, (results) => {
      console.log(user.id, results);
      done(null, results[0]);
    });
  });
};
