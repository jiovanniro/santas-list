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
}]);