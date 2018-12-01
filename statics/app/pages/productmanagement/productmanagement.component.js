// (function() {
//   'use strict';

angular
  .module('ProductManagement')

  .component('produdusList', {
    templateUrl: 'static/app/pages/productmanagement/templates/produduse.html',
    controller: function ($scope, popupService, $window, Produdus) {
      // GET : Take everything

      $scope.produduse = Produdus.query();


      $scope.deleteProdudus = function (produdus) { // Delete a produdus. Issues a DELETE to /api/produduse/:id
        if (popupService.showPopup('Really delete this?')) {
          produdus.$delete(function () {
            $window.location.href = ''; //redirect to home
            // $window.location.reload();  //same shit     
          });
        }
      };
      // controllerAs: 'ProdudusListController'
    }
  })

  .component('produdusView', {
    templateUrl: 'static/app/pages/productmanagement/templates/produdus-view.html',
    controller: function ($scope, $stateParams, Produdus) {
      $scope.produdus = Produdus.get({
        id: $stateParams.id
      }); //Get a single produdus.Issues a GET to /api/produduse/:id
    }
    // controllerAs: 'ProdudusViewController'

  })


  .component('produdusCreate', {
    templateUrl: 'static/app/pages/productmanagement/templates/produdus-add.html',
    controller: function ($scope, $state, $stateParams, Produdus) {
      $scope.produdus = new Produdus(); //create new produdus instance. Properties will be set via ng-model on UI

      $scope.addProdudus = function () { //create a new produdus. Issues a POST to /api/produduse
        $scope.produdus.$save(function () {
          $state.go('productmanagement'); // on success go back to home i.e. produduse state.
        });
      };

      // controllerAs: 'ProdudusCreateController'
    },
  })


  .component('produdusEdit', {
    templateUrl: 'static/app/pages/productmanagement/templates/produdus-edit.html',
    controller: function ($scope, $state, $stateParams, Produdus) {

      $scope.updateProdudus = function () { //Update the edited produdus. Issues a PUT to /api/produduse/:id
        $scope.produdus.$update(function () {
          $state.go('productmanagement'); // on success go back to home i.e. produduse state.
        });
      };

      $scope.loadProdudus = function () { //Issues a GET request to /api/produduse/:id to get a produdus to update
        $scope.produdus = Produdus.get({
          id: $stateParams.id
        });
      };

      $scope.loadProdudus(); // Load a produdus which can be edited on UI
    }
    // controllerAs: 'ProdudusEditController',
  })

// function ProdudusListController(popupService, $window, Produdus) 
//     {
//     // GET : Take everything
//     var $scope = this;
//     $scope.produduse = Produdus.query();


//     $scope.deleteProdudus = function(produdus) { // Delete a produdus. Issues a DELETE to /api/produduse/:id
//       if (popupService.showPopup('Really delete this?')) {
//         produdus.$delete(function() {
//           $window.location.href = ''; //redirect to home
//           // $window.location.reload();  //same shit     
//          });
//       }
//     };
//   // controllerAs: 'ProdudusListController'
// }




// function ProdudusViewController($stateParams, Produdus) {
//   var $scope = this;
//   $scope.produdus = Produdus.get({id:$stateParams.id}); //Get a single produdus.Issues a GET to /api/produduse/:id
// }
// // controllerAs: 'ProdudusViewController'




// function ProdudusCreateController($state, $stateParams, Produdus) {
// var $scope = this;
// $scope.produdus = new Produdus();  //create new produdus instance. Properties will be set via ng-model on UI

// $scope.addProdudus = function() { //create a new produdus. Issues a POST to /api/produduse
//   $scope.produdus.$save(function() {
//     $state.go('productmanagement'); // on success go back to home i.e. produduse state.
//   });
// };

// // controllerAs: 'ProdudusCreateController'
// }



// function ProdudusEditController($state, $stateParams, Produdus) {
//    var $scope = this;

//   $scope.updateProdudus = function() { //Update the edited produdus. Issues a PUT to /api/produduse/:id
//   $scope.produdus.$update(function() {
//   $state.go('productmanagement'); // on success go back to home i.e. produduse state.
//   });
// };

// $scope.loadProdudus = function() { //Issues a GET request to /api/produduse/:id to get a produdus to update
// $scope.produdus = Produdus.get({id:$stateParams.id});
// };

// $scope.loadProdudus(); // Load a produdus which can be edited on UI
// }
// // controllerAs: 'ProdudusEditController'





// })();