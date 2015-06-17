module.exports = function(app){

	var Transactionid = app.models.transactionid;

	var controller = {};

	function gerarUmCupon(){
		var a = '';
		var b = '';
		var c = '';
		var d = '';

		a = (Math.floor(Math.random() * 10)).toString();
		b = (Math.floor(Math.random() * 10)).toString();
		c = (Math.floor(Math.random() * 10)).toString();
		d = (Math.floor(Math.random() * 10)).toString();

		var numero = '';
		numero = a + b + c + d;

		var dados = { 
	      "numero" : numero, 
	      "created_at" : Date.now, 
	      "the_sorteio" : null
	    };

	    return dados;
	};

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

						if(result.transaction.status == 3 || result.transaction.status == '3'){
							Transactionid.findOne({'id': result.transaction.code})
							.exec()
							.then(
								function(transactionid){
									for(i = 0; i <= transactionid.qtdmudas; i++){
										var Cupon = app.models.cupon;
										Cupon.create(gerarUmCupon()).then(function(cupon){
											console.log('Criado cupon : ' + cupon._id);
											transactionid.findOneAndUpdate(transactionid._id, {$push: {cupons: cupon}}, {safe: true, upsert: true}, function(e){console.log(e);});
											// FIM transactionid.findOneAndUpdate()
										}, function(er){
											console.log(er);
										}); // FIM then() in Cupon.create(gerarUmCupon())
									}
								},
								function(erro){
									console.log(erro)
								});// FIM then() in Transactionid.findOne({'id': result.transaction.code})
						}
						
						console.log('result.transaction.code');
						console.log(result.transaction.code);
						console.log('result.transaction.status');
						console.log(result.transaction.status);
						res.send(result);
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