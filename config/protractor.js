var config = require('./config')();

exports.config = {
	sauceUser : config.sauceUser, 
  	sauceKey : config.sauceKey, 
  	capabilities : {
	    'name': config.sauceTestName,
	    'browserName': 'chrome',
	    'tunnel-identifier': config.travisJobNumber,
	    'build': config.travisBuild
	},
  	specs: ['../test/e2e/**/*.js'],
  	onPrepare: function() {
	    browser.driver.get('http://localhost:3000');
  	}
};