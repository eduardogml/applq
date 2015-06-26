angular.module('applq').factory('Sorteio', function($resource){
	return $resource('/sorteios/:id');
});