angular.module('santasList.controllers', [])
    .controller('LoginController', ['$scope', '$location', '$routeParams', 'Products', function($scope, $location, $routeParams, Products){
        console.log('in login controller');

        $scope.login = function() {
            UserService.login($scope.username, $scope.password)
            .then(() => {
                redirect();
            }, (err) => {
                alert("Incorrect Username/Password");
                console.log("error");
            });
        };
        $scope.logout = function(){
            UserService.logout().then($location.path('/'));
        };
        let password = document.getElementById("inputPassword");
        let confirm_password = document.getElementById("confirmPassword");
      
      function validatePassword(){
        if(password.value != confirm_password.value) {
          confirm_password.setCustomValidity("Passwords Don't Match");
        } else {
          confirm_password.setCustomValidity('');
        }
      }
      
      password.onchange = validatePassword;
      confirm_password.onkeyup = validatePassword;

        function redirect() { //might need to be changed later on
            var dest = $location.search().dest;
            if (!dest) { dest = '/adult' }
            $location.replace().path(dest).search('dest', null);
        }

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