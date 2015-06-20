exports.proximoSorteio = function (){

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

	return dataObj;
}

exports.enviarEmailSendgrid = function(emailTo, htmlParaEnvio){
	var sendgrid  = require('sendgrid')('eduardogml', 'azbz1929edgm268456');
	sendgrid.send({
		to:       emailTo,
		from:     'retorno@trevosustentavel.com.br',
		subject:  'Trevo Sustentavel - Promoção Plantaqui',
		html:     htmlParaEnvio,
	}, function(erro, json) {
		if (erro){
			return console.error(erro);
		}
		console.log('EMAIL OK! - ' + emailTo);
	});
}

exports.enviarEmailDireto = function(emailTo, htmlParaEnvio){
	var email = require('mailer');
	email.send({
		host : "smtp.gmail.com",
		port : "465",
		ssl : true,
		domain : "trevosustentavel.com.br",
		to : emailTo,
		from : "retorno@trevosustentavel.com.br",
		subject : "Trevo Sustentavel - Promoção Plantaqui",
		text: "Trevo Sustentavel - Promoção Plantaqui",
		html: htmlParaEnvio ,
		authentication : "login",        // auth login is supported; anything else $
		username : 'trevosustentavel@gmail.com',
		password : 'Silas85208520'
	},
	function(erro, result){
		if(erro){
			console.error(erro);
		}
		else{
			console.log('Email Sent');
		}
	});
}

exports.enviarSmsDirectCalll = function(telefoneDestino, arrayNumeros, dataDoSorteio){
	var dataFormatada = 
	("0" + dataDoSorteio.getDate()).substr(-2) 
	+ "/" 
	+ ("0" + (dataDoSorteio.getMonth() + 1)).substr(-2) 
	+ "/" 
	+ dataDoSorteio.getFullYear();

	for(i = 0; i < arrayNumeros.length; i++){
		var request = require('request');
		request.post({
				url: 'https://api.directcallsoft.com/request_token',
				form: {
				client_id: 'brasilmaquinasltda@gmail.com',
				client_secret: '0153769'
			}
			}, function(erro, httpRes, body){
				var corpo = JSON.parse(body);
				if(erro){
				console.error(erro);
			}else{
				var request2 = require('request');
				request2.post({
					url: 'https://api.directcallsoft.com/sms/send',
					form: {
					origem: '5571996857865',
					destino: telefoneDestino,
					tipo: 'texto',
					access_token: corpo.access_token,
					texto: 'Trevo Sustentavel: Numero da Sorte '+arrayNumeros[i]+'. Data do sorteio: '+dataFormatada+'. BOA SORTE! COMPARTILHE ESSA PROMOCAO: www.trevosustentavel.com.br'
				}
				}, function(erro2, httpRes2, body2){
					if(erro2) console.error(erro2);
				});
				console.log('SMS OK! - ' + telefoneDestino);
			}
		});
	}
}

exports.gerarNumeros = function(qtd){
	var numerosGerados = [];

	for(i = 0; i < qtd; i++){
		var a = '';var b = '';var c = '';var d = '';
		a = (Math.floor(Math.random() * 10)).toString();b = (Math.floor(Math.random() * 10)).toString();c = (Math.floor(Math.random() * 10)).toString();d = (Math.floor(Math.random() * 10)).toString();
		var numero = '';
		numero = a + b + c + d;
		numerosGerados.push(numero);
	}

	return numerosGerados;
}

exports.gerarCupons = function(numeros, sorteio){
	cupons = [];
	for(i = 0; i < numeros.length; i++){
		dados = { 
			numero : numeros[i],
			created_at : Date.now(), 
			the_sorteio : sorteio
	    };
	    cupons.push(dados);
	}
	return cupons;
}