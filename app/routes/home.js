module.exports = function(app){
	app.get('/', function(req, res){
		var request = require('request');
		for(j = 0; j < 5; j++){
		request.post({
			url: 'https://api.directcallsoft.com/request_token',				form: {
														client_id: 'brasilmaquinasltda@gmail.com',
														client_secret: '0153769'
													}
												}, function(err, httpRes, body){
													var corpo = JSON.parse(body);

													if(err){
														console.log(err);
													}else{
														var request2 = require('request');
														request2.post({
															url: 'https://api.directcallsoft.com/sms/send',
															form: {
																origem: '5571996857865',
																destino: '5581985767772',
																tipo: 'texto',
																access_token: corpo.access_token,
																texto: 'TREVO SUSTENTAVEL: SEU NUMERO DA SORTE E . VOCE ESTA PARTICIPANDO DO SORTEIO DE. BOA SORTE! COMPARTILHE ESSA PROMOCAO: WWW.TREVOSUSTENTAVEL.COM.BR'
															}
														}, function(err2, httpRes2, body2){
															if(err2) console.log(err2);
															console.log('ok');
													});
													}
												});
								}
		res.end('home');
	});
};