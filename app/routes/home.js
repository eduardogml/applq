module.exports = function(app){
	app.get('/', function(req, res){/*

		// Enviando e-mails usando o Node.js e o famoso nodemailer
		var nodemailer = require('nodemailer');
		 
		// Vamos criar a conta que irá mandar os e-mails
		var conta = nodemailer.createTransport({
		    service: 'Gmail', // Existem outros services, você pode procurar
		                      // na documentação do nodemailer como utilizar
		                      // os outros serviços
		    auth: {
		        user: 'eduardogml.webmaster@gmail.com', // Seu usuário no Gmail
		        pass: 'azbz1929edgm268456' // A senha da sua conta no Gmail :-)
		    }
		});
		 
		conta.sendMail({
		    from: 'Trevo Sustentavel <retorno@trevosustentavel.com.br>', // Quem está mandando
		    to: 'Eduardo Gomes <eduardogml.webmaster@gmail.com>', // Para quem o e-mail deve chegar
		    subject: 'Email de teste', // O assunto
		    html: '<strong>Oi Eduardo!</strong><p>Estou testando seu enviar e-mails!</p>', // O HTMl do nosso e-mail
		}, function(err){
		    if(err)
		        throw err;
		 
		    console.log('E-mail enviado!');
		});*/

		res.render('home');
	});
};