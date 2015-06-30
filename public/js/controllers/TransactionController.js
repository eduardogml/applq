angular.module('applq').controller('TransactionController', function($scope, Transactionid, $routeParams) {

		if($routeParams.transId) {
			Transactionid.get({id: $routeParams.transId}, 
				function(transactionid) {
					$scope.transactionid = transactionid;
				}, 
				function(erro) {
					$scope.mensagem = {
					  texto: 'Transactionid não existe. Novo contato.'
					};
				}
			);	
		} else {
			$scope.transactionid = new Transactionid();
		}


		$scope.salva = function() {
		  $scope.transactionid.$save()
		  	.then(function() {
		  		$scope.mensagem = {texto: 'Salvo com sucesso'};
		  		// limpa o formulário
		  		$scope.transactionid = new Transactionid();
		  	})
		  	.catch(function(erro) {
		  		$scope.mensagem = {texto: 'Não foi possível salvar'};
		  	});
		};
});