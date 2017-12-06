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

            //create user
        $scope.createUser = function() {
            var u = new User($scope.newUser); //information all needs to have a ng-model of newUser
            u.$save(function(success){
                console.log(success);
            }, function(err){
                console.log(err);
            })
        }

    }])

    .controller('AdultController', ['$scope', 'Adult', 'ChildUser', 'Child', '$location', '$routeParams','SEOService', function($scope, Adult, ChildUser, Child, $location, $routeParams, SEOService) {
    
            //get child within the adult id
        function getChildList() {
            $scope.childList = Adult.get({id: UserService.adultId()}, function(success){
                    console.log('working');
                    return success;
                }, function(err){
                    console.log('error');
                }
            );
        }

        getChildList();

            //if no children in list then send to child sign up
        if (getChildList.id.length === undefined || 0) {
                //might need to be changed later on
            var dest = $location.search().dest;
            if (!dest) { dest = '/kidSignUp' }
            $location.replace().path(dest).search('dest', null);
        }

            //get items
        $scope.Items = function(childId) {
            ChildUser.get({id: childId}, function(success){
                console.log('working');
            }, function(err){
                console.log('error');
            });
        }

            //get comments
        $scope.Comments = function(itemId) {
            Child.get({id: itemId}, function(success){
                console.log('working');
            }, function(err){
                console.log('error');
            });
        };

            //post comment
        $scope.SendComments = function(){
            var comment = new Adult({
                message: $scope.message,
                commentName: $scope.name,
                itemId: UserService.userId() 
            });
            comment.$save(function(success){
                console.log(success);
            }, function(err){
                console.log(err);
            })
        }

    }])
    
    .controller('ChildController', ['$scope', 'Child', '$location', '$routeParams', 'UserService','SEOService', function($scope, Child, $location, $routeParams, UserService, SEOService) {
        console.log('ChildController');

            // * post item needs more work. Only set up for one item to pass through.
        $scope.sendItem = function() {
            var item = new Child({
                itemName: $scope.Items
            });
            item.$save({id: UserService.userId()}, function(success){
                console.log(success);
            }, function(err){
                console.log(err);
            })
        }
    }])
    
    .controller('ChildLoginController', ['$scope', 'ChildUser', 'User', '$location', '$routeParams', 'UserService','SEOService', function($scope, ChildUser, User, $location, $routeParams, UserService, SEOService) {

            //create child user
        $scope.createChildUser = function() {
            var u = new ChildUser({
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