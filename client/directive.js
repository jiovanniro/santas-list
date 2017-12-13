angular.module('santasList.directive', [])
.directive('santaFoot', [function() {
    return {
        restrict: 'E', //Element
        templateUrl: '/views/footer.html'
    };
}])
.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keyup keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});