module.exports = function (app) {
	
  var controller = app.controllers.transactionid;

  app.route('/transactionids')
  	.get(controller.listaTransactionids)
  	.post(controller.salvaTransactionid)

  app.route('/transactionids/:id')
	.get(controller.obtemTransactionid)
	.delete(controller.removeTransactionid);
};
