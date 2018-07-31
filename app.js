const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config({ path: 'variables.env' });
const bodyParser = require('body-parser');
/*passport*/
const passport = require('passport');
const session = require('express-session');

//const localStrategy = require('passport-local').Strategy;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// takes raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret:  'some value',
  resave: true,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const user = require('./models/User');


passport.use(user.createStrategy());

/*require for google strategy*/
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

/*adding goole functionality*/
passport.use(new GoogleStrategy(
{
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
},
(request, accessToken, refreshToken, profile, done) => {
  user.findOrCreate({ username: profile.emails[0].value }, (err, user) => 
    done(err, user));
}
));

/*adding github functionality*/
// const GitHubStrategy = require('passport-github').Strategy;

// passport.use(
//   new GitHubStrategy(
//     {
//       clientID: process.env.GITHUB_CLIENT_ID,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET,
//       callbackURL: process.env.GITHUB_CALLBACK_URL
//     },
//     function(accessToken, refreshToken, profile, cb) {
//       User.findOrCreate({ githubId: profile.id }, function(err, user) {
//         return cb(err, user);
//       });
//     }
//   )
// );

/* read/write user login info*/
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.render('error', { title: 'Movies' });
});

module.exports = app;
