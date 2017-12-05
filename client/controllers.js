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


        $scope.createUser = function() {
            var u = new User($scope.newUser); //information all needs to have a ng-model of newUser
            u.$save(function(success){
                console.log(success);
            }, function(err){
                console.log(err);
            })
        }

    }])

    .controller('AdultController', ['$scope', 'Adult', '$location', '$routeParams','SEOService', function($scope, Adult, $location, $routeParams, SEOService) {
        console.log('AdultController');
    }])
    
    .controller('ChildController', ['$scope', 'Child', '$location', '$routeParams','SEOService', function($scope, Child, $location, $routeParams, SEOService) {
        console.log('ChildController');
    }])
    
    .controller('ChildLoginController', ['$scope', 'ChildLogin', 'User', '$location', '$routeParams', 'UserService','SEOService', function($scope, ChildLogin, User, $location, $routeParams, UserService, SEOService) {
        console.log('ChildLoginController');

        $scope.createChildUser = function() {
            var u = new User({
                username: $scope.firstname,
                password: $scope.password,
                adultId:  UserService.adultId() //check to make sure this works
            });
            u.$save(function(success){
                console.log(success);
            }, function(err){
                console.log(err);
            })
        }
    }]);