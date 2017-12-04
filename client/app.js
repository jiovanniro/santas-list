var app = angular.module('myStore', ['ngRoute', 'ngResource', 'myStore.controllers', 'myStore.factories', 'myStore.directive','myStore.services']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

$locationProvider.html5Mode(true);

$routeProvider
    .when('/', {
        templateUrl: 'views/home.html',
    })

    .when('/checkout', {
        templateUrl: 'views/checkout.html', 
        controller: 'cartController'
    })

    .when('/cart', {
        templateUrl: 'views/cart.html', 
        controller: 'cartController'
    })

    .when('/contact', {
        templateUrl: 'views/contact.html', 
        controller: 'contactController'
    })

    .when('/products/:id', {
        templateUrl: 'views/products.html',
        controller: 'productsController',
    })

    .when('/misc/:id', {
        templateUrl: 'views/misc.html', 
        controller: 'productsController'
    })
    
    .when('/single/:id', {
        templateUrl: 'views/single.html', 
        controller: 'singleController'
    })
    .otherwise({
        redirectTo: '/'
    });
}]);