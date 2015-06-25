exports.emailDoSorteio = function(arrayNumeros){
	var email = '';
	email = '<div><a href="http://www.trevosustentavel.com.br" target="_blank"><img width="680px" height="250px" src="http://www.trevosustentavel.com.br/CIMA.jpg" class="CToWUd"></a><br></div><div></div><div><br><br>PARABÉNS &nbsp;(nome)&nbsp;<strong>!</strong><br>VOCÊ ESTA CONCORRENDO AO SORTEIO DO PRÊMIO DE INCENTIVO: &nbsp;02 (DUAS) MOTOS 0 KM.<br>DATA DO SORTEIO &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;<strong>.</strong>&nbsp; &nbsp; &nbsp;(SÁBADO)<br>SEU (S) NÚMERO (S) DA SORTE É:<br>';

	for(i = 0; i < arrayNumeros.length; i++){
		email += ('<strong>' + arrayNumeros[i] + '</strong><br>');
	}

	email += 'BOA SORTE!&nbsp;<br>CONTINUE FAZENDO A SUA PARTE E&nbsp;<span style="font-size:12pt">COMPARTILHE E DIVULGUE ESSA PROMOÇÃO COM SEUS AMIGOS E FAMILIARES.</span><br><span style="font-size:12pt">TODOS POR UMA SÓ CAUSA!</span><br><a href="http://www.trevosustentavel.com.br" target="_blank">www.trevosustentavel.com.br</a><br><span style="font-size:12pt"><br></span><br>REGULAMENTO NO SITE.<br><br><br></div><div><a href="https://www.facebook.com/profile.php?id=100009022152444" target="_blank"><img width="680px" height="250px" src="http://www.trevosustentavel.com.br/Baixo.jpg" class="CToWUd"></a><div class="yj6qo"></div><div class="adL"><br></div></div>';

	return email;
}