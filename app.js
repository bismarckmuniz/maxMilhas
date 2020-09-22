var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var load = require('express-load');

var admin = require("firebase-admin");
var serviceAccount = require("./key/database-36137-firebase-adminsdk-nemuc-9f1c2dbdb7.json");
    app.firebase = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://database-36137.firebaseio.com"
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

load('controllers', {cwd: 'src'})
    .then('routes')
    .into(app);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;