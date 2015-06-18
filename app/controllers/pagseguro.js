module.exports = function(app){

	var Transactionid = app.models.transactionid;

	var controller = {};

	controller.reqCode = function(req, res){
		var _qtd = req.params.qtd;
		var js2xmlparser = require('js2xmlparser');
		var options = {
			declaration: {
				encoding: 'ISO-8859-1',
			}
		};
		var data = {
		    "currency": "BRL",
		    "items": {
		    	"item": {
			    	"id": "0001",
			    	"description": "Muda",
			    	"amount": "10.00",
			    	"quantity": _qtd,
			    	"weight": "1"
			    }
			},
		    "reference": "REF0001"+_qtd,
		    "sender": {
		    	"phone": {
		    		"areaCode": "81",
		    		"number": "985767772"
		    	}
		    }
		};
		var xml = js2xmlparser("checkout", data, options);
		var request = require('request');
		var objRetorno = {};

		request({
			url: 'https://ws.sandbox.pagseguro.uol.com.br/v2/checkout?email=financeiro@trevosustentavel.com.br&token=86B372F41C414668893110868BB66799',
			method: 'POST',
			headers: {
				'Content-Type': 'application/xml; charset=UTF-8'
			},
			body: xml
		}, function(error, response, body){
			if(error){
				console.log(error);
				res.status(500).json(error);
			}else{
				var parseString = require('xml2js').parseString;
				parseString(body, function (err, result){
					if(err){
						console.log(err);
						res.status(500).json(err);
					}else{
						objRetorno.code = result.checkout.code;
						objRetorno.date = result.checkout.date;
						res.send(objRetorno.code);
					}
				});// FIM parseString()
			}
		});// FIM request()

	};// FIM controller.reqCode()

	controller.saveTransId = function(req, res){
		var dados = {
			"id": req.body.id,
			"qtdmudas": req.body.qtdmudas,
			"facebookname": req.body.facebookname || null,
			"facebookidapp": req.body.facebookidapp || null,
			"facebookemail": req.body.facebookemail || null,
			"facebooklink": req.body.facebooklink || null,
			"cupons": null
		};

		Transactionid.create(dados).then(
			function(transactionid){
				res.status(201).json(transactionid);
			}, 
			function(erro){
				console.log(erro);
				res.status(500).json(erro);
			}); // FIM Transactionid.create(dados)
	};// FIM controller.saveTransId()

	controller.notificationCode = function(req, res){
		var request = require('request');
		request({
			url: 'https://ws.sandbox.pagseguro.uol.com.br/v3/transactions/notifications/'
			+ req.body.notificationCode
			+ '?email=financeiro@trevosustentavel.com.br&token=86B372F41C414668893110868BB66799',
			method: 'GET'
		}, function(error, response, body){
			if(error){
				console.log(error);
				res.status(500).json(error);
			}else{
				var parseString = require('xml2js').parseString;
				parseString(body, function (err, result){
					if(err){
						console.log(err);
						res.status(500).json(err);
					}else{
						console.log(result.transaction.sender);
						console.log(result.transaction.sender.phone);
						var numTelefone = '5581985767772';

						if(result.transaction.status == 3 || result.transaction.status == '3'){

							query = {id: result.transaction.code};
							var promise0 = Transactionid.findOne(query).exec();

							promise0.then(function(transactionid){

								var tranid = transactionid._id;


								var dataObj = new Date();
								  var hoje = dataObj.getDay();
								  var horaDoSorteio = 19;
								  var minDoSorteio = 00;
								  var segDoSorteio = 00;

								  switch(hoje){
								    case 0:
								      dataObj.setDate(dataObj.getDate() + 6);
								      dataObj.setHours(horaDoSorteio);
								      dataObj.setMinutes(minDoSorteio);
								      dataObj.setSeconds(segDoSorteio);
								      break;
								    case 1:
								      dataObj.setDate(dataObj.getDate() + 5);
								      dataObj.setHours(horaDoSorteio);
								      dataObj.setMinutes(minDoSorteio);
								      dataObj.setSeconds(segDoSorteio);
								      break;
								    case 2:
								      dataObj.setDate(dataObj.getDate() + 4);
								      dataObj.setHours(horaDoSorteio);
								      dataObj.setMinutes(minDoSorteio);
								      dataObj.setSeconds(segDoSorteio);
								      break;
								    case 3:
								      dataObj.setDate(dataObj.getDate() + 3);
								      dataObj.setHours(horaDoSorteio);
								      dataObj.setMinutes(minDoSorteio);
								      dataObj.setSeconds(segDoSorteio);
								      break;
								    case 4:
								      dataObj.setDate(dataObj.getDate() + 2);
								      dataObj.setHours(horaDoSorteio);
								      dataObj.setMinutes(minDoSorteio);
								      dataObj.setSeconds(segDoSorteio);
								      break;
								    case 5:
								      dataObj.setDate(dataObj.getDate() + 1);
								      dataObj.setHours(horaDoSorteio);
								      dataObj.setMinutes(minDoSorteio);
								      dataObj.setSeconds(segDoSorteio);
								      break;
								    case 6:
								      if(dataObj.getHours < 16){
								        dataObj.setDate(dataObj.getDate() + 0);
								        dataObj.setHours(horaDoSorteio);
								        dataObj.setMinutes(minDoSorteio);
								        dataObj.setSeconds(segDoSorteio);
								      }else{
								        dataObj.setDate(dataObj.getDate() + 7);
								        dataObj.setHours(horaDoSorteio);
								        dataObj.setMinutes(minDoSorteio);
								        dataObj.setSeconds(segDoSorteio);
								      }
								      break;
								  };
								var Sorteio = app.models.sorteio;
								var query2 = {data: {$gte: dataObj}};
								console.log(query2);
								var promise = Sorteio.findOne(query2).exec();
								promise.then(function(sorteio){
									if(sorteio) {
										console.log('sorteio existe');
										var cupons = [];
											for(i = 0; i <= transactionid.qtdmudas; i++){
												var a = '';var b = '';var c = '';var d = '';
												a = (Math.floor(Math.random() * 10)).toString();
												b = (Math.floor(Math.random() * 10)).toString();
												c = (Math.floor(Math.random() * 10)).toString();
												d = (Math.floor(Math.random() * 10)).toString();
												var numero = '';
												numero = a + b + c + d;
												var dados = {};
												dados = { 
											      numero : numero, 
											      created_at : dataObj, 
											      the_sorteio : sorteio
											    };								    
											    cupons.push(dados);
											}

											console.log(cupons.length);

											for(j = 0; j < cupons.length; j++){
												var dataFormatada = ("0" + dataObj.getDate()).substr(-2) + "/" + ("0" + (dataObj.getMonth() + 1)).substr(-2) + "/" + dataObj.getFullYear();
												var request = require('request');
												request.post({
													url: 'https://api.directcallsoft.com/request_token',
													form: {
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
																destino: numTelefone,
																tipo: 'texto',
																access_token: corpo.access_token,
																texto: 'TREVO SUSTENTAVEL: SEU NUMERO DA SORTE E ' + cupons[j].numero + '. VOCE ESTA PARTICIPANDO DO SORTEIO DE ' + dataFormatada + '. BOA SORTE! COMPARTILHE ESSA PROMOCAO: WWW.TREVOSUSTENTAVEL.COM.BR'
															}
														}, function(err2, httpRes2, body2){
															if(err2) console.log(err2);
													});
														console.log(cupons[i].numero);
													}
												});
											}

											var Cupon = app.models.cupon;
											Cupon.create(cupons)
											.then(
												function(cupon) {

													var transacao = {cupons: cupon};
													Transactionid.findByIdAndUpdate(tranid, transacao).exec()
												     .then(
												      function(transactionid0) {
												        res.send(transactionid0);
												      }, 
												      function(erro) {
												        console.error(erro);
												      }
												     );

												}, 
												function(erro) {
													console.log(erro);
													res.status(500).json(erro);
												});
								    } else {
								    	console.log('sorteio nao existe');
								      Sorteio.create({data: dataObj})
								      .then(
								        function(sort) {
								          var cupons = [];
											for(i = 0; i <= transactionid.qtdmudas; i++){
												var a = '';var b = '';var c = '';var d = '';
												a = (Math.floor(Math.random() * 10)).toString();
												b = (Math.floor(Math.random() * 10)).toString();
												c = (Math.floor(Math.random() * 10)).toString();
												d = (Math.floor(Math.random() * 10)).toString();
												var numero = '';
												numero = a + b + c + d;
												var dados = {};
												dados = { 
											      numero : numero, 
											      created_at : dataObj, 
											      the_sorteio : sort
											    };								    
											    cupons.push(dados);
											}

											console.log(cupons.length);

											for(j = 0; j < cupons.length; j++){
												var dataFormatada = ("0" + dataObj.getDate()).substr(-2) + "/" + ("0" + (dataObj.getMonth() + 1)).substr(-2) + "/" + dataObj.getFullYear();
												var request = require('request');
												request.post({
													url: 'https://api.directcallsoft.com/request_token',
													form: {
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
																destino: numTelefone,
																tipo: 'texto',
																access_token: corpo.access_token,
																texto: 'TREVO SUSTENTAVEL: SEU NUMERO DA SORTE E ' + cupons[j].numero + '. VOCE ESTA PARTICIPANDO DO SORTEIO DE ' + dataFormatada + '. BOA SORTE! COMPARTILHE ESSA PROMOCAO: WWW.TREVOSUSTENTAVEL.COM.BR'
															}
														}, function(err2, httpRes2, body2){
															if(err2) console.log(err2);
													});
														console.log(cupons[i].numero);
													}
												});
											}

											var Cupon = app.models.cupon;
											Cupon.create(cupons)
											.then(
												function(cupon) {
													
													var transacao = {cupons: cupon};
													Transactionid.findByIdAndUpdate(tranid, transacao).exec()
												     .then(
												      function(transactionid0) {
												        res.send(transactionid0);
												      }, 
												      function(erro) {
												        console.error(erro);
												      }
												     );

												}, 
												function(erro) {
													console.log(erro);
													res.status(500).json(erro);
												});
								        }, 
								        function(err0) {
								          console.log(err0);
								        }
								      );
								    }
								}, function(er){
									console.log(err0);
								});


							}, function(errPro0){
								console.log(errPro0);
							});

						}
					}
				});// FIM parseString()
			}
		});
	};// FIM controller.notificationCode()

	controller.consulta = function(req, res){
		var request = require('request');
		request({
			url: 'https://ws.sandbox.pagseguro.uol.com.br/v3/transactions/'+req.params.transId+'?email=financeiro@trevosustentavel.com.br&token=86B372F41C414668893110868BB66799',
			method: 'GET'
		}, function(error, response, body){
			if(error){
				console.log(error);
				res.status(500).json(error);
			}else{
				var parseString = require('xml2js').parseString;
				parseString(body, function (err, result){
					if(err){
						console.log(err);
						res.status(500).json(err);
					}else{
						res.send(body);
					}
				});// FIM parseString()
			}
		});// FIM request()
	};// FIM controller.consulta()

	return controller;
};