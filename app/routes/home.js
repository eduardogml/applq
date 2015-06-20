module.exports = function(app){
	app.get('/', function(req, res){
		var moment = require('moment');
		console.log(moment().format('DD/MM/YYYY Z'));
		res.render('home');
	});
};