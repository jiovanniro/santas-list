angular.module('santasList.directive', [])
.directive('santaFoot', [function() {
    return {
        restrict: 'E', //Element
        templateUrl: '/views/footer.html'
    };
}]);