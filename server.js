// *** Dependencies
// =============================================================
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require('express-session');
const PORT = process.env.PORT || 3001;
const models = require("./models");
const express = require('express');
const LocalStrategy = require('passport-local').Strategy;
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const cookieSession = require('cookie-session');
const app = express();

// Static assets
app.use(express.static("./client/build"));
app.use(express.static('./client/public')); // client/dist


// Sets up the Express app to handle data parsing - AZ
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

// app.use(logger('dev')); 
// app.use(cookieParser()); 
// app.use(cookieSession({keys: ['secretkey1', 'secretkey2', '...']})); // 
// app.use(session({ secret: 'coders', resave: true, saveUninitialized: true }));
// app.use(passport.session());
// passport.serializeUser(models.User.serializeUser());
// passport.deserializeUser(models.User.deserializeUser());
// Configure passport-local to use account model for authentication
	// passport.use(new LocalStrategy(models.User.authenticate()));

// Load Passport Strategies

const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authenticaion checker middleware
const authCheckMiddleware = require('./server/middleware/auth-check'); //controllers
app.use('/apt', authCheckMiddleware); // api

// routes
const authRoutes = require('./routes/auth'); //./routes/authRoutes
const apiRoutes = require('./routes/api');
app.use('/auth', authRoutes);
app.use('/apt', apiRoutes); //api

//Leslie's

const routes = require("./routes")(passport);
app.use('/', routes);

// AZ 

// app.get("*", (req, res) => {
// 	res.sendFile(path.join(__dirname, "./client/public/index.html"));
//   }); in /routes/index.js

app.use(express.static(path.join(__dirname, 'public')));

// Mongo DataBase

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