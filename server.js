
var http = require('http');
var app  = require('./config/express')();
var config = require('./config/config')();

http.createServer(app).listen(config.port, config.address, function(){
	console.log('Applq Express Nodejs Server v1.0.0: ' 
	+ config.address + ' (' + config.env + ') escutando na porta ' + config.port);
});