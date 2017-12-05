var app = angular.module('santaList', ['ngRoute', 'ngResource', 'santaList.factories', 'santaList.directive','santaList.services']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

$locationProvider.html5Mode(true);

$routeProvider
    .when('/', {
        templateUrl: 'views/home.html',
    })

    .when('/adults', {
        templateUrl: 'views/adults.html', 
        controller: 'cartController'
    })

    .when('/kids', {
        templateUrl: 'views/kids.html', 
        controller: 'cartController'
    })

    .when('/akidreturnpage', {
        templateUrl: 'views/akidreturnpage.html', 
        controller: 'contactController'
    })

    .when('/thankyou', {
        templateUrl: 'views/thankyou.html',
        controller: 'productsController',
    })
    
    .otherwise({
        redirectTo: '/'
    });
}]);