angular.module('santasList.factories', [])
    
.factory('User', ['$resource', function($resource){
        console.log('In User factory');
        return $resource('/api/users/:id', { id: '@id' }); 
}])

.factory('Child', ['$resource', function($resource){
        return $resource('/api/child/:id', { id: '@id' });  
}])

.factory('Adult', ['$resource', function($resource){
        return $resource('/api/adult/:id', { id: '@id' });  
}])

//might not need this factory
.factory('ChildUser', ['$resource', function($resource){
        return $resource('/api/child/createChild/:id', { id: '@id' });  
}])

.factory('Gift', ['$resource', function($resource){
        return $resource('/api/child/gifts/:id', { id: '@id' });  
<<<<<<< HEAD
}])
=======
}])

.factory('Letter', ['$resource', function($resource) {
        return $resource('/api/sendlist/:id', { id: '@id' });
}])
>>>>>>> 530b07ee6aaed055618c37d3389568d73dd3df79
