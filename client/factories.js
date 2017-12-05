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

//might not need this factory
app.factory('ChildUser', ['$resource', function($resource){
        return $resource('/api/child/createChild/:id', { id: '@id' });  
}]);