var funcoes = require('./../helpers/funcoes.js');

module.exports = function (app) {
	
  var controller = app.controllers.transactionid;

  app.route('/transactionids')
  	.get(funcoes.verificaAutenticacao, controller.listaTransactionids)
  	.post(funcoes.verificaAutenticacao, controller.salvaTransactionid);

  app.route('/transactionids/:id')
	.get(funcoes.verificaAutenticacao, controller.obtemTransactionid)
	.delete(funcoes.verificaAutenticacao, controller.removeTransactionid);
};
