// angular.module('demoApp.services',[])
//        .factory('Produs', function($resource)
//     {
//     var restAPIUrl = "http://localhost:8000";
//     return $resource(restAPIUrl + '/Product/producttypes/:id',
//     { id: '@id'},
//     { update: {method:'PUT'}} );
    
//     });

angular.module('ProductManagement.services', [])
       .factory('Produdus', function($resource) {
    return $resource('/Product/products/:id/',{id:'@id'},{
        update: {method:'PUT'},
    },{

    
    stripTrailingSlashes: false
  });
})
       .service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});
