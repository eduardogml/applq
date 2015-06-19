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
						var numTelefone = '5581985767772';
						var emailEnviar = 'retorno@trevosustentavel.com.br';

						if(result.transaction.status == 3 || result.transaction.status == '3'){

							if(result.transaction.sender[0].phone[0].areaCode[0] && result.transaction.sender[0].phone[0].number[0]) 
								numTelefone = '55' 
							+ result.transaction.sender[0].phone[0].areaCode[0] 
							+ result.transaction.sender[0].phone[0].number[0];

							if(result.transaction.sender[0].email[0]) emailEnviar = result.transaction.sender[0].email[0];

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
								var promise = Sorteio.findOne(query2).exec();
								promise.then(function(sorteio){
									if(sorteio) {
										var cupons = [];
										var htmlEnvio = '<div><a href="http://www.trevosustentavel.com.br" target="_blank"><img width="680px" height="250px" src="http://www.trevosustentavel.com.br/systrevo/img/mail/CIMA.jpg" class="CToWUd"></a><br></div><div></div><div><br><br>PARABÉNS &nbsp;(nome)&nbsp;<strong>!</strong><br>VOCÊ ESTA CONCORRENDO AO SORTEIO DO PRÊMIO DE INCENTIVO: &nbsp;02 (DUAS) MOTOS 0 KM.<br>DATA DO SORTEIO &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;<strong>.</strong>&nbsp; &nbsp; &nbsp;(SÁBADO)<br>SEU (S) NÚMERO (S) DA SORTE É:<br>';
											for(i = 0; i < transactionid.qtdmudas; i++){
												var a = '';var b = '';var c = '';var d = '';
												a = (Math.floor(Math.random() * 10)).toString();b = (Math.floor(Math.random() * 10)).toString();c = (Math.floor(Math.random() * 10)).toString();d = (Math.floor(Math.random() * 10)).toString();
												var numero = '';
												numero = a + b + c + d;
												var dados = {};
												dados = { 
											      numero : numero, 
											      created_at : dataObj, 
											      the_sorteio : sorteio
											    };
											    cupons.push(dados);
											    htmlEnvio += ('<strong>' + numero + '</strong><br>');

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
																destino: '5581999651201',
																tipo: 'texto',
																access_token: corpo.access_token,
																texto: 'TREVO SUSTENTAVEL: SEU NUMERO DA SORTE E '+numero+'. VOCE ESTA PARTICIPANDO DO SORTEIO DE '+dataFormatada+'. BOA SORTE! COMPARTILHE ESSA PROMOCAO: WWW.TREVOSUSTENTAVEL.COM.BR'
															}
														}, function(err2, httpRes2, body2){
															if(err2) console.log(err2);
													});
														console.log('SMS OK!');
													}
												});
											}
											htmlEnvio += 'BOA SORTE!&nbsp;<br>CONTINUE FAZENDO A SUA PARTE E&nbsp;<span style="font-size:12pt">COMPARTILHE E DIVULGUE ESSA PROMOÇÃO COM SEUS AMIGOS E FAMILIARES.</span><br><span style="font-size:12pt">TODOS POR UMA SÓ CAUSA!</span><br><a href="http://www.trevosustentavel.com.br" target="_blank">www.trevosustentavel.com.br</a><br><span style="font-size:12pt"><br></span><br>REGULAMENTO NO SITE.<br><br><br></div><div><a href="https://www.facebook.com/profile.php?id=100009022152444" target="_blank"><img width="680px" height="250px" src="http://www.trevosustentavel.com.br/systrevo/img/mail/Baixo.jpg" class="CToWUd"></a><div class="yj6qo"></div><div class="adL"><br></div></div>';

											/*
												var email = require('mailer');
												email.send({
												    host : "smtp.gmail.com",
												    port : "465",
												    ssl : true,
												    domain : "trevosustentavel.com.br",
												    to : emailEnviar,
												    from : "retorno@trevosustentavel.com.br",
												    subject : "Mailer library Mail node.js",
												    text: "Mail by Mailer library",
												    html: htmlEnvio ,
												    authentication : "login",        // auth login is supported; anything else $
												    username : 'trevosustentavel@gmail.com',
												    password : 'Silas85208520'
												    },
												    function(errr, result){
												      if(errr){ console.log(errr); }
												      else { console.log('Email Sent'); }
												});*/

												var sendgrid  = require('sendgrid')('eduardogml', 'azbz1929edgm268456');
												sendgrid.send({
												  to:       'brasilmaquinasltda@gmail.com',
												  from:     'retorno@trevosustentavel.com.br',
												  subject:  'Trevo Sustentavel - Promoção Plantaqui',
												  html:     htmlEnvio,
												}, function(errr, json) {
												  if (errr) { return console.error(errr); }
												  console.log('EMAIL OK!');
												});

											var Cupon = app.models.cupon;
											Cupon.create(cupons)
											.then(
												function(cupon) {

													var transacao = {cupons: cupon};
													Transactionid.findByIdAndUpdate(tranid, transacao).exec()
												     .then(
												      function(transactionid0) {
												      	console.log('CUPONS CRIADOS OK');
												        res.send('OK');
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
								      Sorteio.create({data: dataObj})
								      .then(
								        function(sort) {
								          var cupons = [];
											var htmlEnvio = '<div><a href="http://www.trevosustentavel.com.br" target="_blank"><img width="680px" height="250px" src="http://www.trevosustentavel.com.br/systrevo/img/mail/CIMA.jpg" class="CToWUd"></a><br></div><div></div><div><br><br>PARABÉNS &nbsp;(nome)&nbsp;<strong>!</strong><br>VOCÊ ESTA CONCORRENDO AO SORTEIO DO PRÊMIO DE INCENTIVO: &nbsp;02 (DUAS) MOTOS 0 KM.<br>DATA DO SORTEIO &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;<strong>.</strong>&nbsp; &nbsp; &nbsp;(SÁBADO)<br>SEU (S) NÚMERO (S) DA SORTE É:<br>';
												for(i = 0; i < transactionid.qtdmudas; i++){
													var a = '';var b = '';var c = '';var d = '';
													a = (Math.floor(Math.random() * 10)).toString();b = (Math.floor(Math.random() * 10)).toString();c = (Math.floor(Math.random() * 10)).toString();d = (Math.floor(Math.random() * 10)).toString();
													var numero = '';
													numero = a + b + c + d;
													var dados = {};
													dados = { 
												      numero : numero, 
												      created_at : dataObj, 
												      the_sorteio : sorteio
												    };
												    cupons.push(dados);
												    htmlEnvio += ('<strong>' + numero + '</strong><br>');

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
																	destino: '5581999651201',
																	tipo: 'texto',
																	access_token: corpo.access_token,
																	texto: 'TREVO SUSTENTAVEL: SEU NUMERO DA SORTE E '+numero+'. VOCE ESTA PARTICIPANDO DO SORTEIO DE '+dataFormatada+'. BOA SORTE! COMPARTILHE ESSA PROMOCAO: WWW.TREVOSUSTENTAVEL.COM.BR'
																}
															}, function(err2, httpRes2, body2){
																if(err2) console.log(err2);
														});
															console.log('SMS OK!');
														}
													});
												}
												htmlEnvio += 'BOA SORTE!&nbsp;<br>CONTINUE FAZENDO A SUA PARTE E&nbsp;<span style="font-size:12pt">COMPARTILHE E DIVULGUE ESSA PROMOÇÃO COM SEUS AMIGOS E FAMILIARES.</span><br><span style="font-size:12pt">TODOS POR UMA SÓ CAUSA!</span><br><a href="http://www.trevosustentavel.com.br" target="_blank">www.trevosustentavel.com.br</a><br><span style="font-size:12pt"><br></span><br>REGULAMENTO NO SITE.<br><br><br></div><div><a href="https://www.facebook.com/profile.php?id=100009022152444" target="_blank"><img width="680px" height="250px" src="http://www.trevosustentavel.com.br/systrevo/img/mail/Baixo.jpg" class="CToWUd"></a><div class="yj6qo"></div><div class="adL"><br></div></div>';

												/*
												var email = require('mailer');
												email.send({
												    host : "smtp.gmail.com",
												    port : "465",
												    ssl : true,
												    domain : "trevosustentavel.com.br",
												    to : emailEnviar,
												    from : "retorno@trevosustentavel.com.br",
												    subject : "Mailer library Mail node.js",
												    text: "Mail by Mailer library",
												    html: htmlEnvio ,
												    authentication : "login",        // auth login is supported; anything else $
												    username : 'trevosustentavel@gmail.com',
												    password : 'Silas85208520'
												    },
												    function(errr, result){
												      if(errr){ console.log(errr); }
												      else { console.log('Email Sent'); }
												});*/

												var sendgrid  = require('sendgrid')('eduardogml', 'azbz1929edgm268456');
												sendgrid.send({
												  to:       'brasilmaquinasltda@gmail.com',
												  from:     'retorno@trevosustentavel.com.br',
												  subject:  'Trevo Sustentavel - Promoção Plantaqui',
												  html:     htmlEnvio,
												}, function(errr, json) {
												  if (errr) { return console.error(errr); }
												  console.log('EMAIL OK!');
												});

											var Cupon = app.models.cupon;
											Cupon.create(cupons)
											.then(
												function(cupon) {
													
													var transacao = {cupons: cupon};
													Transactionid.findByIdAndUpdate(tranid, transacao).exec()
												     .then(
												      function(transactionid0) {
												      	console.log('CUPONS CRIADOS OK');
												        res.send('OK');
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
						res.send(result);
					}
				});// FIM parseString()
			}
		});// FIM request()
	};// FIM controller.consulta()

	return controller;
};