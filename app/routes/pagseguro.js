module.exports = function(app){
	var controller = app.controllers.pagseguro;

	app.route('/pagseguroreqcode/:qtd')
	.get(controller.reqCode);

	app.route('/pagseguronotificacao')
	.post(controller.notificationCode);
};