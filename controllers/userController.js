const passport = require('passport');
const User = require('../models/User');

exports.register = (req, res) => {
  res.render('register', { title: 'Register', warning: '', user: req.user });
};

exports.registerUser = (req, res) => {
  const newUser = new User({username: req.body.username});
  
  User.register(newUser, req.body.password, function(err, account){
    if(err){
     //I need to say 'return' below otherwise node will complain that header already sent
     return res.render('register',{
       title: 'Register',
       warning: 'Sorry that username is already taken',
       
     });
    }
    /*if sucessful*/
    res.redirect('/login');
  });
};


exports.login = (req, res) => {
  const messages =  req.session.messages || [];

  /*clear session messages*/
  req.session.messages = [];

  res.render('login', { 
    title: 'Login', 
    messages,
    user: req.user, });
};

