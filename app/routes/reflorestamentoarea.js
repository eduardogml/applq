module.exports = function (app) {
	
  var controller = app.controllers.reflorestamentoarea;

  app.route('/reflorestamentoareas')
  .post(controller.salvaReflorestamentoarea);
};
