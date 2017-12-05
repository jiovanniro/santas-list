angular.module('santaList.directive', [])
.directive('santaNav', [function() {
angular.module('santasList.directive', [])
.directive('listNav', [function() {
    return {
        restrict: 'E', //Element
        templateUrl: '/views/nav.html'
    };
}]);