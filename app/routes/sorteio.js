var funcoes = require('./../helpers/funcoes.js');

module.exports = function (app) {
	
  var controller = app.controllers.sorteio;

  app.route('/sorteios')
  	.get(funcoes.verificaAutenticacao, controller.listaSorteios);

  app.route('/sorteios/:id')
	.get(funcoes.verificaAutenticacao, controller.obtemSorteio);
};
