module.exports = function (app) {
	
  var controller = app.controllers.cupon;

  app.route('/cupons')
  	.get(controller.listaCupons)
  	.post(controller.salvaCupon)

  app.route('/cupons/:id')
	.get(controller.obtemCupon)
	.delete(controller.removeCupon);
};
