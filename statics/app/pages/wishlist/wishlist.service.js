// angular.module('demoApp.services',[])
//        .factory('Produs', function($resource)
//     {
//     var restAPIUrl = "http://localhost:8000";
//     return $resource(restAPIUrl + '/Product/producttypes/:id',
//     { id: '@id'},
//     { update: {method:'PUT'}} );
    
//     });

angular.module('wishList.services', [])
       .factory('Produs', function($resource) {
    return $resource('/Products/:_id/',{_id:'@_id'},{
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
