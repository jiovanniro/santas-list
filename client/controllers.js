angular.module('santasList.controllers', [])
    .controller('LoginController', ['$scope', '$location', '$routeParams', 'Products', function($scope, $location, $routeParams, Products){
        console.log('in login controller');
    }])

    .controller('AdultController', ['$scope', 'Adult', '$location', '$routeParams','SEOService', function($scope, Adult, $location, $routeParams, SEOService) {
        console.log('AdultController');
    }])
    
    .controller('ChildController', ['$scope', 'Child', '$location', '$routeParams','SEOService', function($scope, Child, $location, $routeParams, SEOService) {
        console.log('ChildController');
    }])
    
    .controller('ChildLoginController', ['$scope', 'ChildLogin', 'User', '$location', '$routeParams','SEOService', function($scope, ChildLogin, User, $location, $routeParams, SEOService) {
        console.log('ChildLoginController');
    }]);