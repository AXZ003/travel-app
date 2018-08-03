// Dependencies
// =============================================================
var path = require("path");



// Routes
// =============================================================
module.exports = function(app, passport) {

    // Each of the below routes just handles the HTML page that the user gets sent to.
  
    // index route loads view.html
    app.get("/", function(req, res) {
      res.sendFile(path.join(__dirname, "./client/public/index.html"));
      // res.send('Welcome to Passport with Sequelize');
    });
      
    app.post('/signup', passport.authenticate('local-signup', {
      
      successRedirect: '/portfolio',
  
      failureRedirect: '/'
      
    }));
  
  
    // portfolio route loads portfolio.html
    app.get("/portfolio", isLoggedIn, function(req, res) { // need to change portfolio
      console.log(JSON.stringify(req.user))
      res.sendFile(path.join(__dirname, "../public/portfolio.html")); // need to change to index.html
    });
  
    // research route loads research.html
    app.get("/research", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/research.html")); // need to change to index.html
    });
  
    app.get('/logout', function(req,res) {
      
      
      req.session.destroy(function(err) {
      
        res.redirect('/');
  
      });
    });
  
    
    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/portfolio',
        failureRedirect: '/'
  
    }));
  
    // app.get('/portfolio', (req, res) => res.send("Welcome "+req.user.firstname+" "+req.user.lastname+"!!"));
   
    // function isLoggedIn(req, res, next) {
   
    //   if (req.isAuthenticated())
       
    //       return next();
           
    //   res.redirect('/signin');
   
    // } 
  
  
    function isLoggedIn(req, res, next) {
   
      console.log(req.body);
      console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
      console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
      console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
  
      console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
  
      console.log(res.body);
      if (req.isAuthenticated())
       
  
          return next();
           
      res.redirect('/signin');
      
    }
  
  
  };
  
  
  // USE APP.USE FOR HOME