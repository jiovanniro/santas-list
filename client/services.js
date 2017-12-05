<<<<<<< HEAD
angular.module('santaList.services', [])    
=======
angular.module('santasList.services', [])    
>>>>>>> 6e0e05a2a611d1321c23ae69c3b350bb7c9d85ee
.service('SEOService', ['$rootScope', function($rootScope) {
    this.setSEO = function(data) {
        $rootScope.seo = {}; 
        for(var p in data) {
            $rootScope.seo[p] = data[p];
        }
    }
}])

.service('UserService', ['$http', '$location', function($http, $location) {
    let currentUser; 

    this.isLoggedIn = function() {
        //return current user
        if(currentUser) {
            return true;
        } else {
            return false;
        }
    }

    this.isAdmin = function() {
        if (currentUser && currentUser.role === 'admin') {
            return true;
        } else {
            return false;
        }
    }

    this.loginRedirect = function() {
        //get current location
        let current = $location.path();
        //send the user to login and set a search param call dest so we can send them back there after login
        $location.replace().path('/login').search('dest', current);
    }

    this.login = function(username, password) {
        return $http({
            method: 'POST', 
            url: '/api/users/login',
            data: {username: username, password: password}
        }).then(function(response) {
            currentUser = response.data; //useful info returned from promise
            return currentUser;
        });
    }

    this.logout = function() {
        return $http({
            method: 'GET', 
            url: '/api/users/logout'
        }).then(function() {
            currentUser = undefined;
        });
    }

    this.me = function() {
        if (currentUser) {
            return Promise.resolve(currentUser); 
        } else {
            return $http({
                method: 'GET',
                url: '/api/users/me'
            }).then(function(response) {
                currentUser = response.data;
                return currentUser;
            });
        }
    }
}])