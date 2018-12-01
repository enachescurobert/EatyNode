angular.module('inTendant.services', [])
       .factory('User', function($resource) {
    return $resource('/Purchase/users/:id/',{id:'@id'},{
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
