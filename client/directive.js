angular.module('santasList.directive', [])
.directive('santaFoot', [function() {
    return {
        restrict: 'E', //Element
        templateUrl: '/views/footer.html'
    };
}])
.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});
// .directive('myAddInput', function () {
//     return function (scope, element, attrs) {
//         var max_fields = 10; //maximum input boxes allowed
//         var wrapper = angular.element( document.querySelector( '#toy-items' ) );
//         var x = 2; //initlal text box count
        
//         element.bind("click", function (event) {
//             if(x < max_fields){ //max input box allowed
//                 $(wrapper).append(`<div><input type="text" id="item${x}" ng-model="item${x}" ng-keyup="search(item${x}, $event)" my-enter="addToList(item${x})"/></div>`); //add input box
//                 x++; //text box increment
//             }
//         });

//     };
// });