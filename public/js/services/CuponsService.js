angular.module('applq').factory('Cupon', function($resource) {	
	return $resource('/cupons/:id');
});