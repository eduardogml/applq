var funcoes = require('./../helpers/funcoes.js');

module.exports = function(app){
	app.get('/', function(req, res){
		funcoes.enviarEmailDireto('eduardogml.webmaster@gmail.com', '<h1>Teste Email</h1>');
		res.render('home');
	});
};