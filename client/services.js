angular.module('myStore.services', [])    
.service('SEOService', ['$rootScope', function($rootScope) {
    this.setSEO = function(data) {
        $rootScope.seo = {}; 
        for(var p in data) {
            $rootScope.seo[p] = data[p];
        }
    }
}]);