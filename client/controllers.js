var c = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = c.getContext('2d');

var w = window.innerWidth;
var h = window.innerHeight;
var rate = 50;
var arc = 500;
var time;
var count;
var size = 2;
var speed = 6;
var light = new Array;
var colors = ["#eee"];

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    w = canvas.width;
    h = canvas.height;
    init();
    bubble()
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

.controller('AdultController', ['$scope', 'Adult', 'Gift', 'ChildUser', 'Child', 'UserService', '$location', '$routeParams','SEOService', function($scope, Adult, Gift, ChildUser, Child, UserService, $location, $routeParams, SEOService) {

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
                console.log(success[0].id);
                firstChildList(success[0].id); //find a way to make this work when page loads
            }, function(err){
                console.log('no kids in list');
                createKidProfile();
            }
        );
    }

    function firstChildList(kidId) {
        $scope.ItemList = Gift.query({id: kidId}, function(success){
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
        var childId = document.getElementById('adultDropDown').value;
        console.log('ChildId: ' + childId);
        $scope.ItemList = Gift.query({id: childId}, function(success){
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
                divComment.appendChild(textComment);
                divContainer.appendChild(divComment);
            }
        }, function(err){
            console.log('comments error');
        });
    };

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

}])

.controller('ChildLoginController', ['$scope', 'Child', '$location', '$routeParams', 'UserService','SEOService', function($scope, Child, $location, $routeParams, UserService, SEOService) {

    console.log('In the childLoginController');

    $scope.login = function() {
        UserService.loginChild($scope.Username, $scope.Password)
        .then(() => {
            let userId = UserService.user().id;
            let userIdString = JSON.stringify(userId);
            localStorage.setItem('childID', userIdString);
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

.controller('ChildController', ['$scope', '$parse', '$location', '$routeParams', 'ChildUser', 'User', 'UserService', 'searchService', 'Child', 'Gift', 'SEOService', 'AdultUser', function($scope, $parse, $location, $routeParams, ChildUser, User, UserService, searchService, Child, Gift, SEOService, AdultUser) {
    let childname = $scope.name; 
    // let behavior = $scope.behavior; 
    // let message = $scope.message; 

    //create child user
    $scope.createChildUser = function() {
        let userId = localStorage.getItem("childID");
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

    let x = 2; //initlal text box count
    $scope.addNewToy = function() {
        var max_fields = 5; //maximum input boxes allowed
    
        if(x < max_fields){ //max input box allowed
            var $div = $(`<input style="border: 1px solid purple; float: left; margin-bottom: 0.1em" type="text" id="item${x}" class="kidInput" ng-model="gifts.item${x}" ng-keyup="search(gifts.item${x}, $event)" ng-enter="removeFilteredItems()"/>`); //add input box            
            var $target = $("#gift-list");
            angular.element($target).injector().invoke(function($compile) {
                var $scope = angular.element($target).scope();
                $target.append($compile($div)($scope));
            });
            x++; //text box increment
        }
    };

    $scope.search = function(string, event) {
        let target = event.target.id;

        console.log('in search');
        searchService.searchInput(string)
        .then(function(data){
            suggestions(data); 
         });

        function suggestions(data) {
            topSuggestions = [data[0], data[1], data[2]];
            var output = [];

            angular.forEach(topSuggestions, function(input) {
                if(input.toLowerCase().indexOf(string.toLowerCase()) >= 0) {
                    output.push(input);
                }
            });
            $scope.filteredItems = output;
            showSuggestions();
        } 

        function showSuggestions() {
            console.log('showing suggestions');
            console.log($(`#${target}`));
            $(`#${target}`).append("<p style='color: #fff'>vghvhgvh</p>");
            $scope.hidethis = false;
        }

        $scope.selectItem = function(item) {
            console.log('inside select item'); 
            console.log(item);
            var ref = `gifts.${target}`;
            getter = $parse(ref);
            getter.assign($scope, item);
            $scope.hidethis = true;
        }

        $scope.removeFilteredItems = function() {
            $scope.hidethis = true;
            $(`#${target}`).blur();
            $('.letterBG').focus();
        }
        
        $scope.addToList = function(gifts) {
            $scope.hidethis = true;
            $scope.item1 = "";
            let userId = localStorage.getItem('famList');
            
            console.log('add to list');
            wishListItems = Object.values(gifts);

            wishListItems.forEach(function(item) {
                console.log(userId);
                var wishList = new Child({
                    item: item,
                    userId: userId
                });

                console.log("wishListItems: " + wishListItems);

                wishList.$save({id: userId}, 
                    function(success){
                    prepMessageToParent();
                    //$location.path(`/thankyou/${userId}`);
                        console.log(success);
                    }, function(err){
                        console.log(err);
                    })
            });
        }

        function prepMessageToParent() {
            console.log('send message to parent');
            let userId = localStorage.getItem("childID");

            function getChildInfo(userId) {
                $scope.child = ChildUser.get({id: userId}, function(success){
                    getChildsParent($scope.child.adult_id)
                    console.log(success);
                }, function(err){
                    console.log('no kid');
                });
            }

            function getChildsParent(id) {
                console.log('getting childs parent info')
                $scope.parent = AdultUser.get({id: id}, function(success) {
                    sendMessageToParent($scope.parent.username, $scope.parent.email)
                    console.log(success);
                    //sendMessageToParent($scope.child, $scope.parent);
                }, function(err){
                    console.log('no adult');
                })
            }

            getChildInfo(userId);
        }

        function sendMessageToParent(parentUsername, parentEmail) {
            console.log("child " + $scope.name);
            console.log("parent " + parentEmail);
            // console.log('userid: ' + userId);
            // console.log('child: ' + $scope.child); 
            // console.log('adult: ' + $scope.parent);
            // let letterToSanta = new Letter({
            //     name: , 
            //     behavior: , 
            //     message: , 
            //     wishlist: 
            // });
        }
        
     }
}])

.controller('ThankyouController', ['$scope', '$parse', '$location', '$routeParams', 'Child', 'Adult', 'Gift', 'searchService', 'Letter', 'SEOService', function($scope, $parse, $location, $routeParams, Child, Adult, Gift, searchService, Letter, SEOService){
    $scope.hidethis = true;
    $scope.hidesuggestions = true;
    $scope.hideconfirmation = true;
    $scope.addToList = function() {
        console.log('open the add div');
        $scope.hidethis = false;
    }

    let x = 2; //initlal text box count
    $scope.addNewToy = function() {
        var max_fields = 10; //maximum input boxes allowed
    
        if(x < max_fields){ //max input box allowed
            var $div = $(`<div><input type="text" id="item${x}" class="kidInput" ng-model="gifts.item${x}" ng-keyup="search(gifts.item${x}, $event)" ng-enter="removeFilteredItems()"/></div>`); //add input box            
            var $target = $("#toy-items");
            angular.element($target).injector().invoke(function($compile) {
                var $scope = angular.element($target).scope();
                $target.append($compile($div)($scope));
            });
            x++; //text box increment
        }
    };


    $scope.search = function(string, event) {
        console.log('inside search');
        let target = event.target.id; 
        console.log(target);
        

        searchService.searchInput(string)
        .then(function(data){
            suggestions(data); 
        });

        function suggestions(data) {
            topSuggestions = [data[0], data[1], data[2]];
            $scope.hidesuggestions = false;            
            var output = [];
            angular.forEach(topSuggestions, function(input) {
                if(input.toLowerCase().indexOf(string.toLowerCase()) >= 0) {
                    output.push(input);
                }
            });
            $scope.filteredItems = output;
        } 

        $scope.selectItem = function(string) {
            console.log('inside select item'); 
            console.log(string);
            var ref = `gifts.${target}`;
            getter = $parse(ref);
            getter.assign($scope, string);
            $scope.hidesuggestions = true;
        }

        $scope.removeFilteredItems = function() {
            $scope.hidethis = true;
            $(`#${target}`).blur();
            $('.letterBG').focus();
        }
        
        $scope.sendToList = function(gifts) {
            $scope.hidesuggestions = true;
            $scope.item1 = "";
            let userId = localStorage.getItem('famList');
            
            console.log('add to list');
            wishListItems = Object.values(gifts);

            wishListItems.forEach(function(item) {
                var wishList = new Child({
                    item: item,
                    userId: userId
                });

                console.log("wishListItems: " + wishListItems);

                wishList.$save({id: userId}, 
                    function(success){
                        $scope.hidethis = true;
                        $scope.hideoptions = true;
                        $scope.hideconfirmation = false;
                        sendMessageToParent();
                        console.log(success);
                    }, function(err){
                        console.log(err);
                    })
            });
        }
    }

    function sendMessageToParent() {
        let userId = localStorage.getItem("famList");
        $scope.child = new Child.query({id: userId}); 
        $scope.adult = new Adult.query({id: userId});

        console.log('inside send message to parent');
        console.log('userid: ' + userId);
        console.log('child: ' + $scope.child); 
        console.log('adult: ' + $scope.adult);
        // let letterToSanta = new Letter({
        //     name: , 
        //     behavior: , 
        //     message: , 
        //     wishlist: 
        // });
    }
}]);





    
    


