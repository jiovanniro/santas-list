var app = angular.module('santasList', ['ngRoute', 'ngResource', 'santasList.controllers', 'santasList.factories', 'santasList.directive','santasList.services']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

$locationProvider.html5Mode(true);

$routeProvider
    .when('/', {
        templateUrl: 'views/home.html'
    })

    .when('/adultSignIn', {
        templateUrl: 'views/adult_signin.html',
        controller: 'LoginController'
    })

    .when('/kidSignUp', {
        templateUrl: 'views/kid_signup.html',
        controller: 'ChildLoginController'
    })
    
    .when('/kidSignIn', {
        templateUrl: 'views/kid_signin.html',
        controller: 'ChildLoginController'
    })
    
    .when('/kidView', {
        templateUrl: 'views/kid.html',
        controller: 'ChildController'    
    })
    
    .when('/adultView', {
        templateUrl: 'views/adult.html',
        controller: 'AdultController'
    })
    
    .when('/thankYou', {
        templateUrl: 'views/thankyou.html'
    })

    .otherwise({
        redirectTo: '/'
    });
}]);