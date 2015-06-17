angular.module('applq').factory('Transactionid', function($resource) {	
	return $resource('/transactionids/:id');
});