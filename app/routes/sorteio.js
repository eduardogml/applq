module.exports = function (app) {
	
  var controller = app.controllers.sorteio;

  app.route('/sorteios')
  	.get(controller.listaSorteios)
  	.post()

  app.route('/sorteios/:id')
	.get(controller.obtemSorteio)
	.delete();
};
