angular.module('myStore.directive', [])
.directive('storeNav', [function() {
    return {
        restrict: 'E', //Element
        templateUrl: '/views/nav.html'
    };
}]);