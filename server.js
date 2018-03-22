require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Mongoose stuff
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/projectworkfloworganizer');

// var index = require('./routes/index');
// var users = require('./routes/users');
var auth = require('./routes/auth');
var projects = require('./routes/create');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Do we still need this?
app.use(function(req, res, next) {
  // before every route, attach the flash messages and current user to res.locals
  res.locals.currentUser = req.user;
  next();
});

app.use('/auth', auth);
app.use('/create', projects);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
})

module.exports = app;
