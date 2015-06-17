module.exports = function(app){
	app.get('/', function(req, res){
		/*
		var request = require('request');
		request.post({
			url: 'https://api.directcallsoft.com/request_token',
			form: {
				client_id: 'brasilmaquinasltda@gmail.com',
				client_secret: '0153769'
			}
		}, function(err, httpRes, body){
			var corpo = JSON.parse(body);
			console.log(corpo.access_token);

			var request2 = require('request');
			request2.post({
				url: 'https://api.directcallsoft.com/sms/send',
				form: {
					origem: '5581985767772',
					destino: '5581985767772',
					tipo: 'texto',
					access_token: corpo.access_token,
					texto: 'VOCE ACABOU DE GANHAR UM MILHÃO, VIRE PARA o LADO E RECEBA SEU PREMIO.'
				}
			}, function(err2, httpRes2, body2){
				console.log(body2);
			});
		});*/

		res.render('home');
	});
};