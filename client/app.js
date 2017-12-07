var app = angular.module('santasList', ['ngRoute', 'ngResource', 'santasList.controllers', 'santasList.factories', 'santasList.directive','santasList.services']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

$locationProvider.html5Mode(true);

$routeProvider
    .when('/', {
        templateUrl: 'views/home.html'
    })

    .when('/thankyou', {
        templateUrl: 'views/thankyou.html'
        //controller: 'productsController'
        // requiresLogin: true
    })
    .when('/adultSignUp', {
        templateUrl: 'views/adult_signup.html',
        controller: 'LoginController'
    })
    
    .when('/adultSignIn', {
        templateUrl: 'views/adult_signin.html',
        controller: 'LoginController'
    })

    .when('/kidSignUp', {
        templateUrl: 'views/kid_signup.html',
        controller: 'ChildController'
        // This might need requiresAdmin and requiresLogin
    })
    
    .when('/kidSignIn', {
        templateUrl: 'views/kid_signin.html',
        controller: 'ChildLoginController'
    })
    
    .when('/kid', {
        templateUrl: 'views/kid.html',
        controller: 'ChildController',
        requiresLogin: true
    })
    
    .when('/adult', {
        templateUrl: 'views/adult.html',
        controller: 'AdultController',
        requiresLogin: true,
        requiresAdmin: true
    })

    .when('/kidSignUpAdult', {
        templateUrl: 'views/kid_signup_adult.html',
        controller: 'ChildSignUpController'
    })
    
    .otherwise({
        redirectTo: '/'
    });
}])
    // * set for redirect path. This might be editted out later on. *
.run(['$rootScope', '$location', 'UserService', function($rootScope, $location, UserService){
    $rootScope.$on('$rootChangeStart', function(event, nextRoute, previousRoute){
        if (nextRoute.$$route.requiresLogin && !UserService.isLoggedIn()) {
            event.preventDefault();
            UserService.loginRedirect();
        } else if (nextRoute.$$route.requiresAdmin && !UserService.isAdmin()){
            event.preventDefault();
            $location.replace().path('/kid');
        }
    });
}]);