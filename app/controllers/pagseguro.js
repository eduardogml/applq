module.exports = function(app){

	var funcoes = require('./../helpers/funcoes.js');
	var sysconfig = require('./../helpers/sysconfig.js');
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
		    "reference": "REF0001"+_qtd
		};
		var xml = js2xmlparser("checkout", data, options);
		var request = require('request');
		var objRetorno = {};

		request({
			url: sysconfig.pagseguroUrlCheckoutSandBox + sysconfig.emailTokenPagsegSandbox,
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
			"cuponsenviados": false,
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
			url: sysconfig.pagseguroUrlApiNotificacaoSandBox + req.body.notificationCode + sysconfig.emailTokenPagsegSandbox,
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
						if(result.transaction.status[0] == 3){

							var numeroTelefone = '55' + result.transaction.sender[0].phone[0].areaCode[0] + result.transaction.sender[0].phone[0].number[0];
							var email = result.transaction.sender[0].email[0];

							query = {id: result.transaction.code[0]};

							Transactionid.findOne(query).exec().then(
								function(transactionid){
									if(!transactionid.cuponsenviados){

										var htmlEmail = require('./../helpers/htmlEmail.js');

										var tranid = transactionid._id;
										var dataSorteio = funcoes.proximoSorteio();
										var numeros = funcoes.gerarNumeros(transactionid.qtdmudas);
										var emailParaEnvio = htmlEmail.emailDoSorteio(numeros);

										var Sorteio = app.models.sorteio;
										var query2 = {data: {$gte: dataSorteio}};

										Sorteio.findOrCreate(query2, function(err, sort, created){
											if(err) console.log(err);
											var sorteio = null;
											if(sort){
												sorteio = sort;
											}else{
												sorteio = created;
											}
											var cupons = funcoes.gerarCupons(numeros, sorteio);
											var Cupon = app.models.cupon;
											Cupon.create(cupons).then(
												function(cupon) {
													var transacao = {cupons: cupon, cuponsenviados: true};
													Transactionid.findByIdAndUpdate(tranid, transacao).exec().then(
														function(transactionid0) {
															console.log('CUPONS CRIADOS OK');
															//funcoes.enviarEmailDireto('eduardogml.webmaster@gmail.com', emailParaEnvio);
															console.log(numeros);
															for(var i = 0; i < numeros; i++){
																console.log(numeros[i]);
																funcoes.enviarSmsDirectCall('5581985767772', numeros[i], dataSorteio);
															}
															res.send('OK');
														},
														function(erro) {
															console.error(erro);
														}
														);
												}, function(erro) {
													console.log(erro);
													res.status(500).json(erro);
												});
										}); // FIM Sorteio.findOrCreate(query2, function(err, sort, created)
									} // FIM if(!enviadoCupom)
								}, function(errPro0){
										console.log(errPro0);
								}); // FIM promise0.then(function(transactionid)
						} // FIM do if(result.transaction.status[0] == 3)
					}// FIM else
				});// FIM parseString()
			}
		});
	};// FIM controller.notificationCode()

	controller.consulta = function(req, res){
		var request = require('request');
		request({
			url: sysconfig.pagseguroUrlApiConsultaSandBox + req.params.transId + sysconfig.emailTokenPagsegSandbox,
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
						console.log(result.transaction.sender[0].phone[0].areaCode[0]);
						console.log(result.transaction.sender[0].phone[0].number[0]);
						console.log(result.transaction.sender[0].email[0]);
						console.log(result.transaction.status[0]);
						console.log(result.transaction.code[0]);
						res.send(result);
					}
				});// FIM parseString()
			}
		});// FIM request()
	};// FIM controller.consulta()

	return controller;
};