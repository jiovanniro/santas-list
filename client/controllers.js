angular.module('santasList.controllers', [])
    .controller('LoginController', ['$scope', '$location', '$routeParams', 'Products', function($scope, $location, $routeParams, Products){
        console.log('in login controller');
    }])

    .controller('UserController', ['$scope', 'User', '$location', '$routeParams','SEOService', function($scope, User, $location, $routeParams, SEOService) {
        console.log('UserController');
    }]);