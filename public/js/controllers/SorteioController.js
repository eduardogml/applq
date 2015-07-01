angular.module('applq').controller('SorteioController', function($scope, Sorteio, $routeParams, $location, Cupon){
	if($routeParams.sorteioId) {
		Sorteio.get({id: $routeParams.sorteioId},
			function(sorteio) {
				$scope.sorteio = sorteio;
			},
			function(erro) {
				$scope.mensagem = {
				texto: 'Sorteio não existe.'
				};
			}
		);	
	}else{
		$location.path('#/sorteios');
	}

	$scope.salva = function() {
	  $scope.sorteio.$save()
	  	.then(function() {
	  		$scope.mensagem = {texto: 'Finalizado com sucesso'};
	  	})
	  	.catch(function(erro) {
	  		$scope.mensagem = {texto: 'Não foi possível finalizar sorteio'};
	  	});
	};

});