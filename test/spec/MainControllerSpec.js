describe("MainController", function() {
	var $scope;

	beforeEach(function() {
		module('applq');
		inject(function($injector){
			$scope = $injector.get('$rootScope').$new();
		});
	});

	it("Deve escrever mensagem de titulo", 
		inject(function($controller) {
			$controller('MainController', {
				'$scope': $scope
			});
			expect($scope.titulo).toEqual('SERVIDOR APPLQ - PLANTAQUI APP - ON');
	}));

});