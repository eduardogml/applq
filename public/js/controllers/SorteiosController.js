angular.module('applq').controller('SorteiosController', function($scope, Sorteio, $routeParams){
	$scope.sorteios = [];

	$scope.mensagem = {texto: ''};

	function buscaSorteios() {
      Sorteio.query(
        function(sorteios) {
          $scope.sorteios = sorteios;
          $scope.mensagem = {};
        },
        function(erro) {
          console.log(erro);
          $scope.mensagem = {
            texto: 'Não foi possível obter a lista de sorteios'
          };
        }
      ); 
    }
    buscaSorteios();
});