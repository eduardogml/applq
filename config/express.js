var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var helmet = require('helmet');
var cors = require('cors');

module.exports = function(){
	var app = express();

	app.set('port', 3000);

	app.set('view engine', 'ejs');
  	app.set('views','./app/views');
  	app.use(express.static('./public'));
    // middlewares
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(require('method-override')());
    
    app.use(cookieParser());
    app.use(session(
      { secret: 'application plantaqui', 
        resave: true, 
        saveUninitialized: true 
      }
    ));
    
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(cors());

  	load('models', {cwd: 'app'})
  	.then('controllers')
    .then('routes/auth.js')
    .then('routes')
    .into(app);

    app.get('*', function(req, res) {
      res.status(404).render('404');
    });

  	return app;
};