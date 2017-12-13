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

    $scope.logout = function() {
        console.log("Pressed logout");
        UserService.logout().then($location.path('/'));
    };

    $scope.AddChild = function(){
        $location.path('kidSignUp');
    }


    //get child within the adult id
    function getChildList() {
        $scope.childList = Adult.query({id: adultIdParse}, function(success){
                console.log('working');
                console.log(success[0]);
                firstChildList(success[0].id); //find a way to make this work when page loads
            }, function(err){
                console.log('no kids in list');
                createKidProfile();
            }
        );
    }

    function firstChildList(kidId) {
        $scope.ItemList = ChildUser.query({id: kidId}, function(success){
            console.log(success);
            console.log("success");
        }, function(err){
            console.log(err);
            console.log("error");
        });
    }

    function createKidProfile() { //might need to be changed later on
        var dest = $location.search().dest;
        if (!dest) { dest = '/kidSignUp' }
        $location.replace().path(dest).search('dest', null);
    }

   getChildList();

    //get items
    function getItems() {
        var childId = document.getElementById('famList').value;
        console.log('ChildId: ' + childId);
        $scope.ItemList = ChildUser.query({id: childId}, function(success){
            console.log(success);
            console.log("success");
        }, function(err){
            console.log(err);
            console.log("error");
        });
    }

    $scope.Items = function(){
        getItems();
    }


    //see if the item is purchased
    $scope.Purchased = function(itemId){
        var checkbox = document.getElementById("purchasedCheckBox" + itemId);
        if(checkbox.checked){
            console.log("checked");
            var checked = new Adult({
                id: itemId,
                purchased: "true"
            })
            checked.$save({id: itemId}, function(success){
                console.log("success");
            }, function(err){
                console.log(err);
            })
        } else{
            console.log("not checked");
            var checked = new Adult({
                id: itemId,
                purchased: "false"
            })
            checked.$save({id: itemId}, function(success){
                console.log("success");
            }, function(err){
                console.log(err);
            })
        }
    }

    //get comments
    $scope.Comments = function(itemId) {
        Child.query({id: itemId}, function(success){
            console.log('comments working');
            var divContainer = document.getElementById("div" + itemId + "id");
            for (i = 0; i < success.length; i++) {
                var divComment = document.createElement("div");
                var textComment = document.createTextNode(success[i].user + ": " + success[i].message + " ");
                var attribute = document.createAttribute("style");
                attribute.value = "padding-bottom:3%";
                divComment.appendChild(textComment);
                divComment.setAttributeNode(attribute);
                divContainer.appendChild(divComment);
            }
        }, function(err){
            console.log('comments error');
        });
    };


    // $scope.HideComments = function(itemId) {
    //     document.getElementById("divContainer" + itemId).style.display = "none";
    //     document.getElementById("div" + itemId + "id").innerHTML = '';
    //     document.getElementById("btnComments" + itemId).style.display = "";
    //     document.getElementById("btnHideComments" + itemId).style.display = "none";
    // };

    //post comment
    $scope.SendComment = function(item){
        var comment = new Adult({
            message: document.getElementById("message" + item).value,
            itemId: item,
            user: document.getElementById("username" + item).value
        });
        comment.$save(function(success){
            console.log(success);
            var divContainer = document.getElementById("div" + item + "id");
            var divComment = document.createElement("div");
            var textComment = document.createTextNode(document.getElementById("username" + item).value + ": " + document.getElementById("message" + item).value);
            divComment.appendChild(textComment);
            divContainer.appendChild(divComment);
        }, function(err){
            console.log(err);
        })
    }


    $scope.RemoveItem = function(itemId){
        if (confirm("Are you sure you wish to delete this item from the list?")){
            var remove = new Adult({
                id: itemId
            });
            remove.$delete({id: itemId}, function(success){
                console.log('Item Deleted!');
                getItems();
            }, function(err){
                console.log('error');
            })
        }
    }


    //*CANVAS*
        var c = document.getElementById('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        console.log(c);
        var ctx = c.getContext('2d');
    
        var w = window.innerWidth;
        var h = window.innerHeight;
        var rate = 50;
        var arc = 500;
        var time;
        var count;
        var size = 2;
        var speed = 10;
        var light = new Array;
        var colors = ["#eee"];
    

        window.addEventListener('resize', function(){
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            w = canvas.width;
            h = canvas.height;
            init();
        })

        function init(){
            time = 0;
            count = 0;
            
            for(var i = 0; i < arc; i++) {
                light[i] = {
                    x: Math.ceil(Math.random() * w),
                    y: Math.ceil(Math.random() * h),
                    toX: Math.random() * 5 + 1,
                    toY: Math.random() * 5 + 1,
                    col: colors[Math.floor(Math.random()*colors.length)],
                    size: Math.random() * size
                }
            }
        }
    
        function bubble(){
            ctx.clearRect(0,0,w,h);
    
            for(var i = 0; i < arc; i++) {
                var li = light[i]
    
                ctx.beginPath();
                ctx.arc(li.x,li.y,li.size,0,Math.PI*2,false);
                ctx.fillStyle = li.col;
                ctx.fill();
    
                li.x = li.x + li.toX * (time * 0.05);
                li.y = li.y + li.toY * (time * 0.05);
                
                if(li.x > w) { li.x = 0; }
                if(li.y > h) { li.y = 0; }
                if(li.x < 0) { li.x = w; }
                if(li.y < 0) { li.y = h; }
            }
            
            if(time < speed) {
                time++;
            }
    
            timerID = setTimeout(bubble,1000/rate);
        }
        init();
        bubble();
    
    
    




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

.controller('ChildController', ['$scope', '$parse', '$location', '$routeParams', 'ChildUser', 'User', 'UserService', 'searchService', 'Child', 'Gift','SEOService', function($scope, $parse, $location, $routeParams, ChildUser, User, UserService, searchService, Child, Gift, SEOService) {

    //create child user
    $scope.createChildUser = function() {
        let userId = localStorage.getItem("famList");
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

    $scope.items = [{id: 'item1'}];
    let x = 2; //initlal text box count

    $scope.addNewToy = function() {
        var max_fields = 10; //maximum input boxes allowed
    
        if(x < max_fields){ //max input box allowed
            // $('#toy-items').append(`<div><input type="text" id="item${x}" ng-model="item${x}" ng-keyup="search(item${x}, $event)" my-enter="addToList(item${x})"/></div>`); //add input box
            var $div = $(`<div><input type="text" id="item${x}" ng-model="item${x}" ng-keyup="search(item${x}, $event)" my-enter="addToList(item${x})"/></div>`); //add input box            
            var $target = $("#toy-items");
            angular.element($target).injector().invoke(function($compile) {
                var $scope = angular.element($target).scope();
                $target.append($compile($div)($scope));
            });
            x++; //text box increment
        }
    };

    $scope.search = function(string, event) {
        console.log("inside search: " + string);            
        let target = event.target.id; 
        console.log("target: " + target);  

        searchService.searchInput(string)
        .then(function(data){
            suggestions(data); 
        });

        function suggestions(data) {
            console.log(data);
            $scope.hidethis = false;
            var output = [];
            angular.forEach(data, function(input) {
                if(input.toLowerCase().indexOf(string.toLowerCase()) >= 0) {
                    output.push(input);
                }
            });
            $scope.filteredItems = output;
        } 

        $scope.selectItem = function(string) {
            var ref = target;
            getter = $parse(ref);
            getter.assign($scope, string);
            $scope.hidethis = true;
        }

        $scope.removeFilteredItems = function() {
            $scope.hidethis = true;
        }
        
        $scope.addToList = function(item) {
            $scope.hidethis = true;
            $scope.item1 = "";
            let userId = localStorage.getItem('famList');
            
            console.log('add to list');
            console.log("item " + item);

            var newItem = new Child({
                item: item,
                userId: userId
            });

           newItem.$save({id: userId}, 
            function(success){
                $scope.gifts = new Gift.query({id: userId});
                console.log("Gifts: " + $scope.gifts);
               console.log(success);
           }, function(err){
               console.log(err);
           })
        }
    }
}]);
