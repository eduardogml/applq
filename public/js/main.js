angular.module('applq', ['ngRoute', 'ngResource']).config(function($routeProvider, $httpProvider){

	$routeProvider.when('/', {
      templateUrl: 'partials/home.html',
      controller: 'HomeController'
    });

    $routeProvider.when('/transactions', {
      templateUrl: 'partials/transactions.html',
      controller: 'TransactionsController'
    });

    $routeProvider.when('/transaction/:transId', {
      templateUrl: 'partials/transaction.html',
      controller: 'TransactionController'
    });

    $routeProvider.when('/sorteios', {
      templateUrl: 'partials/sorteios.html',
      controller: 'SorteiosController'
    });

    $routeProvider.when('/sorteio/:sorteioId', {
      templateUrl: 'partials/sorteio.html',
      controller: 'SorteioController'
    });

    $routeProvider.otherwise({redirectTo: '/'});
});