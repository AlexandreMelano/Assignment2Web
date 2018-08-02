const passport = require('passport');
const mongoose = require('mongoose');

const User = mongoose.model('User');

/*authenticate login*/
exports.login = passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/login',
    failureMessage: 'Invalid login',
});
/* access to google login*/
exports.googlePre = passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/plus.profile.emails.read'
    ]
  });
  /*redirect */
  exports.googlePost = passport.authenticate('google', {
    successRedirect: '/admin',
    failureRedirect: '/login'
  });
  
  exports.githubPre = passport.authenticate('github');
/*github login access once working*/
  exports.githubPost = passport.authenticate('github',{
    successRedirect: '/admin',
    failureRedirect: '/login' 
    
    });

//  /*github login access once working*/
// exports.githubPost = passport.authenticate(
//   'github',
//   { failureRedirect: '/login' },
//   (req, res) => {
//      //Successful authentication, redirect
//     res.redirect('/admin');
//   }
//  );

/* Check if user is logged in*/
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