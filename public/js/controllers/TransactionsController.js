angular.module('applq').controller('TransactionsController', function($scope, Transactionid, $routeParams){
	$scope.transactionids = [];

	$scope.mensagem = {texto: ''};

	function buscaTransactionids() {
      Transactionid.query(
        function(transactionids) {
          $scope.transactionids = transactionids;
          $scope.mensagem = {};
        },
        function(erro) {
          console.log(erro);
          $scope.mensagem = {
            texto: 'Não foi possível obter a lista de transactionids'
          };
        }
      ); 
    }
    buscaTransactionids();
});