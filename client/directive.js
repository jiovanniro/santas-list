angular.module('santasList.directive', [])
.directive('santaNav', [function() {
    return {
        restrict: 'E', //Element
        templateUrl: '/views/nav.html'
    };
}]);