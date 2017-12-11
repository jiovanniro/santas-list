angular.module('santasList.controllers', [])
.controller('LoginController', ['$scope', '$location', '$routeParams', 'UserService', 'User', function($scope, $location, $routeParams, UserService, User){
    console.log('in login controller');

    $scope.login = function() {
        UserService.login($scope.Username, $scope.Password)
        .then(() => {
            console.log('boomsauce');
            let userId = UserService.user().id;
            let userIdString = JSON.stringify(userId);
            localStorage.setItem('famList', userIdString);
            redirect(); //might need to change this to redirect function
        }, (err) => {
            bootbox.alert({
                message: "Incorrect Username/Password",
                backdrop: true,
                closeButton: false
            });
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
            u.$save(function(success){
                console.log(success);
                var adultId = JSON.stringify(success.id);
                localStorage.setItem('adultId', adultId); 
                createKidProfile();
            }, function(err){
                console.log(err);
                
            });
        } else {
            bootbox.alert({
                message: "Passwords Do Not Match",
                backdrop: true,
                closeButton: false
            });
        }
    };
    
    function createKidProfile() { //might need to be changed later on
        var dest = $location.search().dest;
        if (!dest) { dest = '/kidSignUpAdult' }
        $location.replace().path(dest).search('dest', null);
    }    


}])


.controller('ChildSignUpController', ['$scope', 'ChildUser', '$location', '$routeParams','SEOService', function($scope, ChildUser, $location, $routeParams, SEOService){
    $scope.createChildUser = function() {
        var userId = localStorage.getItem('adultId');
        var userIdParse = JSON.parse(userId);
        var u = new ChildUser({
            username: $scope.NewUser.username,
            password: $scope.NewUser.password,
            adultId:  userIdParse //check to make sure this works
        });
        u.$save(function(success){
            console.log(success);
            localStorage.removeItem('adultId');
            $location.path('/');
        }, function(err){
            console.log(err);
        });
    };
}])



.controller('AdultController', ['$scope', 'Adult', 'ChildUser', 'Child', 'UserService', '$location', '$routeParams','SEOService', function($scope, Adult, ChildUser, Child, UserService, $location, $routeParams, SEOService) {

    let adultId = localStorage.getItem('famList');
    let adultIdParse = JSON.parse(adultId);

    //get child within the adult id
    function getChildList() {
        $scope.childList = Adult.query({id: adultIdParse}, function(success){
                console.log('working');
                return success;
            }, function(err){
                console.log('no kids in list');
                createKidProfile();
            }
        );
    }

    function createKidProfile() { //might need to be changed later on
        var dest = $location.search().dest;
        if (!dest) { dest = '/kidSignUp' }
        $location.replace().path(dest).search('dest', null);
    }

   getChildList();

    //get items
    $scope.Items = function() {
        var childId = document.getElementById('famList').value;
        console.log('ChildId: ' + childId);
        $scope.ItemList = ChildUser.query({id: childId}, function(success){
            console.log('working');
            console.log(success);
        }, function(err){
            console.log('error');
            console.log(err);
        });
    }

    //get comments
    $scope.Comments = function(itemId) {
        Child.query({id: itemId}, function(success){
            console.log('comments working');
            var divContainer = document.getElementById("div" + itemId + "id");
            for (i = 0; i < success.length; i++) {
                var divComment = document.createElement("div");
                var textComment = document.createTextNode(success[i].user + ": " + success[i].message + " ");
                divComment.appendChild(textComment);
                divContainer.appendChild(divComment);
            }
            document.getElementById("divContainer" + itemId).style.display = "";
            document.getElementById("btnComments" + itemId).style.display = "none";
            document.getElementById("btnHideComments" + itemId).style.display = "";
        }, function(err){
            console.log('comments error');
        });
    };

    $scope.HideComments = function(itemId) {
        document.getElementById("divContainer" + itemId).style.display = "none";
        document.getElementById("div" + itemId + "id").innerHTML = '';
        document.getElementById("btnComments" + itemId).style.display = "";
        document.getElementById("btnHideComments" + itemId).style.display = "none";
    };

    //post comment
    $scope.SendComment = function(item){
        var messageScope = $scope.Message;
        var userScope = $scope.Name;
        var comment = new Adult({
            message: messageScope,
            itemId: item,
            user: userScope
        });
        console.log(comment);
        // comment.$save(function(success){
        //     console.log(success);
        //     var divComment = document.createElement("div");
        //     var textComment = document.createTextNode(comment.user + ": " + comment.message + " ");
        //     divComment.appendChild(textComment);
        //     divContainer.appendChild(divComment);
        // }, function(err){
        //     console.log(err);
        // })
    }

}])

.controller('ChildLoginController', ['$scope', 'Child', '$location', '$routeParams', 'UserService','SEOService', function($scope, Child, $location, $routeParams, UserService, SEOService) {

    console.log('In the childLoginController');

    $scope.login = function() {
        UserService.loginChild($scope.Username, $scope.Password)
        .then(() => {
            console.log('boomsauce!!!!!!!!');
            $location.path('/kid');
        }, (err) => {
            bootbox.alert({
                message: "Incorrect Username/Password",
                backdrop: true,
            });
        });
    };


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

.controller('ChildController', ['$scope', 'ChildUser', 'User', 'UserService', '$location', '$routeParams', 'UserService','SEOService', function($scope, ChildUser, User, UserService, $location, $routeParams, UserService, SEOService) {

    //create child user
    $scope.createChildUser = function() {
        let userId = UserService.user().id;
        var u = new ChildUser({
            username: $scope.NewUser.username,
            password: $scope.NewUser.password,
            adultId:  userId 
        });
        u.$save(function(success){
            console.log(success);
            goToAdultPage(); //Might just set location to this
        }, function(err){
            console.log(err);
        });
    };

    function goToAdultPage() { //might need to be changed later on
        var dest = $location.search().dest;
        if (!dest) { dest = '/adult' }
        $location.replace().path(dest).search('dest', null);
    }
    $scope.counter = 1;
    $scope.addInput = function(divName) {
        let limit = 15;
        
        if ($scope.counter == limit) {
            bootbox.alert({
                message: "I think that's enough presents, don't you?",
                backdrop: true,
            });
        } else {
            let newdiv = document.createElement('div');
            let input = document.createElement('input');
            let newCount = $scope.counter + 1;

            newdiv.className = 'col-6 col-sm-6';
            input.placeholder = 'Present ' + newCount;
            input.type = 'text';
            input.id = 'newInput';

            newdiv.appendChild(input);

            document.getElementById(divName).appendChild(newdiv);
            $scope.counter++;
        }
    };
}]);