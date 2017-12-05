var app = angular.module('santasList', ['ngRoute', 'ngResource', 'santasList.controllers', 'santasList.factories', 'santasList.directive','santasList.services']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

$locationProvider.html5Mode(true);

$routeProvider
    .when('/', {
        templateUrl: 'views/home.html',
    })

    .when('/adult', {
        templateUrl: 'views/adults.html'
    })

    .when('/kid', {
        templateUrl: 'views/kids.html', 
        controller: 'cartController'
    })

    .otherwise({
        redirectTo: '/'
    });
}]);