var app = angular.module('santasList.controllers', []);
    app.controller('loginController', ['$scope', '$location', '$routeParams', 'Products', function($scope, $location, $routeParams, Products){
        console.log('in login controller');
    }]);