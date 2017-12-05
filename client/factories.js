var app = angular.module('santasList.factories', []);

app.factory('User', ['$resource', function($resource) {
    return $resource('/api/users/:id', {id: '@id'}, {
        update: {
            method: 'PUT'
        }
    });
}]);