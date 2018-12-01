angular.module('productControllers', [])
       .factory('Produs', function($resource) {
    return $resource('/Product/types/:id/',{id:'@id'},{
        update: {method:'PUT'},
    },{

    
    stripTrailingSlashes: false
  });
})
       .service('popupService', function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
})


.controller('ProdusListController', function($scope, popupService, $window, Produs) 
    {
    // GET : Take everything
    $scope.produse = Produs.query();
  
  
    $scope.deleteProdus = function(produs) { // Delete a produs. Issues a DELETE to /api/produse/:id
      if (popupService.showPopup('Really delete this?')) {
        produs.$delete(function() {
          $window.location.href = ''; //redirect to home
          // $window.location.reload();  //same shit     
         });
      }
    };
  // controllerAs: 'ProdusListController'
})




.controller('ProdusViewController', function($scope, $stateParams, Produs) {
  $scope.produs = Produs.get({id:$stateParams.id}); //Get a single produs.Issues a GET to /api/produse/:id
})
// controllerAs: 'ProdusViewController'




.controller('ProdusCreateController',function ($scope, $state, $stateParams, Produs) {
$scope.produs = new Produs();  //create new produs instance. Properties will be set via ng-model on UI

$scope.addProdus = function() { //create a new produs. Issues a POST to /api/produse
  $scope.produs.$save(function() {
    $state.go('wishlist'); // on success go back to home i.e. produse state.
  });
};

// controllerAs: 'ProdusCreateController'
})



.controller('ProdusEditController', function($scope, $state, $stateParams, Produs) {

  $scope.updateProdus = function() { //Update the edited produs. Issues a PUT to /api/produse/:id
  $scope.produs.$update(function() {
  $state.go('wishlist'); // on success go back to home i.e. produse state.
  });
};

$scope.loadProdus = function() { //Issues a GET request to /api/produse/:id to get a produs to update
$scope.produs = Produs.get({id:$stateParams.id});
};

$scope.loadProdus(); // Load a produs which can be edited on UI
})