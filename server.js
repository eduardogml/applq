
var http = require('http');
var app  = require('./config/express')();

http.createServer(app).listen(app.get('port'), function(){
	console.log('Applq Express Nodejs Server v1.0.0: escutando na porta ' + app.get('port'));
});