module.exports = function(app){
	var controller = app.controllers.pagseguro;

	app.route('/pagseguroreqcode/:qtd')
	.get(controller.reqCode);

	app.route('/pagsegurotransactionid')
	.post(controller.saveTransId);

	app.route('/pagseguronotificacao')
	.post(controller.notificationCode);

	app.route('/pagseguronotificacao/:transId')
	.get(controller.consulta);
};