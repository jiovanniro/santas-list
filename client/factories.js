var app = angular.module('myStore.factories', []);

app.factory('Products', ['$resource', function($resource){
    return $resource('/api/products/:id', { id: '@id' });  
}]);

app.factory('Cart', ['$resource', function($resource){
    return $resource('/api/cart/:id', { id: '@id' });
}]); 

app.factory('Checkout', ['$resource', function($resource){
    return $resource('/api/checkout/:id', { id: '@id' });
}]); 

app.factory('Contact', ['$resource', function($resource){
    return $resource('/api/contact/:id', { id: '@id' });
}]);

app.factory('Single', ['$resource', function($resource){
    return $resource('/api/single/:id', { id: '@id' })
}]);