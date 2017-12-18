angular.module('santasList.services', [])    
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
        if (currentUser && currentUser.role === 'Admin') {
            return true;
        } else {
            return false;
        }
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

    this.loginChild = function(username, password) {
        return $http({
            method: 'POST', 
            url: '/api/child/login',
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
            console.log(currentUser);
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

    this.user = function() {
        return currentUser;
    }
}])

.service('searchService', ['$http', '$location', function($http, $location) {
    return {
        searchInput: function(input) {
            return $http.get(`https://cors-anywhere.herokuapp.com/http://completion.amazon.com/search/complete?search-alias=aps&client=amazon-search-ui&mkt=1&q=${input}`)
            .then(function(response) {
                result = response.data; //useful info returned from promise
                return result[1];
            });
        }
    }
}]);