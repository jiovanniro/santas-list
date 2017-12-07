angular.module('santasList.controllers', [])
    .controller('LoginController', ['$scope', '$location', '$routeParams', 'UserService', 'User', function($scope, $location, $routeParams, UserService, User){
        console.log('in login controller');

        $scope.login = function() {
            UserService.login($scope.Username, $scope.Password)
            .then(() => {
                console.log('boomsauce');
                redirect(); //might need to change this to redirect function
            }, (err) => {
                alert("Incorrect Username/Password");
            });
        };
        $scope.logout = function() {
            UserService.logout().then($location.path('/'));
        };

        function redirect() { //might need to be changed later on
            var dest = $location.search().dest;
            if (!dest) { dest = '/adult' }
            $location.replace().path(dest).search('dest', null);
        }

            //create user dont believe those console lies
        $scope.CreateUser = function() {
            console.log('pressed create user btn');
            if ($scope.NewUser.password === $scope.ConfirmPassword) {
                var u = new User({
                    username: $scope.NewUser.username,
                    email: $scope.NewUser.email,
                    password: $scope.NewUser.password
                    }); //information all needs to have a ng-model of newUser
                console.log(u);
                u.$save(function(err){
                    console.log(err);
                }, function(success){
                    console.log(success);
                });
            } else {
                bootbox.alert({
                    message: "Passwords Do Not Match",
                    backdrop: true
                });
            }
        };

    }])

    .controller('AdultController', ['$scope', 'Adult', 'ChildUser', 'Child', 'UserService', '$location', '$routeParams','SEOService', function($scope, Adult, ChildUser, Child, UserService, $location, $routeParams, SEOService) {
    
        let adultId = UserService.user().id;

        //get child within the adult id
        function getChildList() {
            $scope.childList = Adult.get({id: adultId}, function(success){
                    console.log('working');
                    return success;
                }, function(err){
                    redirect();
                }
            );
        }

        function redirect() { //might need to be changed later on
            var dest = $location.search().dest;
            if (!dest) { dest = '/kidSignUp' }
            $location.replace().path(dest).search('dest', null);
        }

       getChildList();

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
                itemId: UserService.userId(),
                commentName: $scope.name
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
            });
        };
    }]);