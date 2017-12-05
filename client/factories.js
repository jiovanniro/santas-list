var app = angular.module('santasList.factories', []);
    
 app.factory('User', ['$resource', function($resource){
        return $resource('/api/users/:id', { id: '@id' });  
}]);

app.factory('Child', ['$resource', function($resource){
        return $resource('/api/child/:id', { id: '@id' });  
}]);

app.factory('Adult', ['$resource', function($resource){
        return $resource('/api/adult/:id', { id: '@id' });  
}]);

app.factory('ChildLogin', ['$resource', function($resource) {
        return $resource('/api/childLogin/:id', { id: '@id' });
}]);