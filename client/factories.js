var app = angular.module('santaList.factories', []);

app.factory('adults', ['$resource', function($resource){
    return $resource('/api/adults/:id', { id: '@id' });  
}]);

app.factory('akidreturnpage', ['$resource', function($resource){
    return $resource('/api/akidreturnpage/:id', { id: '@id' });
}]); 

app.factory('kids', ['$resource', function($resource){
    return $resource('/api/kids/:id', { id: '@id' });
}]); 

app.factory('thankyou', ['$resource', function($resource){
    return $resource('/api/thankyou/:id', { id: '@id' });
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