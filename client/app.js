<<<<<<< HEAD
var app = angular.module('santaList', ['ngRoute', 'ngResource', 'santaList.factories', 'santaList.directive','santaList.services']);
=======
var app = angular.module('santasList', ['ngRoute', 'ngResource', 'santasList.controllers', 'santasList.factories', 'santasList.directive','santasList.services']);
>>>>>>> 6e0e05a2a611d1321c23ae69c3b350bb7c9d85ee

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

$locationProvider.html5Mode(true);

$routeProvider
    .when('/', {
        templateUrl: 'views/home.html'
    })

<<<<<<< HEAD
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
    
=======
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

>>>>>>> 6e0e05a2a611d1321c23ae69c3b350bb7c9d85ee
    .otherwise({
        redirectTo: '/'
    });
}]);