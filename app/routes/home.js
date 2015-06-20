module.exports = function(app){
	app.get('/', function(req, res){
		var moment = require('moment');
		res.end('home - ' + moment().format('DD/MM/YYYY Z'));
	});
};