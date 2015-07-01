angular.module('applq', ['ngRoute', 'ngResource', 'ngSanitize', 'ngCsv']).config(function($routeProvider, $httpProvider){

  $httpProvider.interceptors.push('meuInterceptor');

  $routeProvider.when('/auth', {
    templateUrl: 'partials/auth.html'
  });

	$routeProvider.when('/', {
    templateUrl: 'partials/home.html',
    controller: 'HomeController'
  });

  $routeProvider.when('/sorteios', {
    templateUrl: 'partials/sorteios.html',
    controller: 'SorteiosController'
  });

  $routeProvider.when('/sorteio/:sorteioId', {
    templateUrl: 'partials/sorteio.html',
    controller: 'SorteioController'
  });
});