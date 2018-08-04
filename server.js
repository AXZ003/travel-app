// *** Dependencies
// =============================================================
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const passport = require("passport");
const session = require('express-session');
const PORT = process.env.PORT || 3000;
const models = require("./models");
const express = require('express');
const LocalStrategy = require('passport-local').Strategy;
const logger = require('morgan');
const cookieParser = require('cookie-parser');
// const session = require('cookie-session');
const app = express();
// Sets up the Express app to handle data parsing - AZ
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev')); //
app.use(cookieParser()); // 
app.use(session({keys: ['secretkey1', 'secretkey2', '...']}));// 
app.use(express.static(path.join(__dirname, 'public')));//

// Static assets
app.use(express.static("client/build"));

// For Passport
app.use(session({ secret: 'coders', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Configure passport-local to use account model for authentication
const User = require('./models/User');
passport.use(new LocalStrategy(User.authenticate()));

// Register routes
app.use('/', require('./routes'));
require("./routes/authRoutesCopy")(router,passport); 

require('./config/passport.js')(passport, models.User);




mongoose.Promise = global.Promise;
if (process.env.MONGODB_URI) {
	mongoose.connect(process.env.MONGODB_URI);
} else {
	mongoose.connect('mongodb://localhost/travelData');
}
var db = mongoose.connection;

db.on('error', function (error) {
	console.log('Mongoose Error: ', error);
});

db.once('open', function () {
	console.log('Mongoose connection successful.');
});

// Start the API server
app.listen(PORT, function () {
	console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});