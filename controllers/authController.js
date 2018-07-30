const passport = require('passport');
const mongoose = require('mongoose');

const User = mongoose.model('User');


exports.login = passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/login',
    failureMessage: 'Invalid login',
});

exports.googlePre = passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/plus.profile.emails.read'
    ]
  });
  
  exports.googlePost = passport.authenticate('google', {
    successRedirect: '/admin',
    failureRedirect: '/login'
  });
  
exports.isLoggedIn = (req, res, next) => {
    //first check if the user is authenticated
    //if succesful
    if (req.isAuthenticated()) {
        next();
        return;
    }else{
        res.redirect('/login');  
    }
    /* if failed*/
    //res.redirect('/login');
    };