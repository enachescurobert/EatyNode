// (function() {
//   'use strict';

  angular
    .module('WishList')

    .component('produsList', {
      controller: ProdusListController,
      templateUrl: 'static/app/pages/wishlist/templates/produse.html',
    })

    .component('produsView', {
      controller: ProdusViewController,
      templateUrl: 'static/app/pages/wishlist/templates/produs-view.html',
      // controllerAs: 'ProdusViewController'

    })


    .component('produsCreate', {
      controller: ProdusCreateController,
      templateUrl: 'static/app/pages/wishlist/templates/produs-add.html',
    })


    .component('produsEdit', {
      controller: ProdusEditController,
      templateUrl: 'static/app/pages/wishlist/templates/produs-edit.html',
      // controllerAs: 'ProdusEditController',
    })

  function ProdusListController($scope, popupService, $window, Produs, NgTableParams) {
    // GET : Take everything
    
    $scope.produse = Produs.query();
    // var self = this;
    // var data = [{name:"produse.name", like: "produse.like", dislike:"produse.dislike"}]
    // self.tableParams = new NgTableParams({
    //   page: 1,            // show first page
    //   count: 10
    // }, { dataset: data});

    $scope.deleteProdus = function (produs) { // Delete a produs. Issues a DELETE to /api/produse/:id
      if (popupService.showPopup('Really delete this?')) {
        produs.$delete(function () {
          $window.location.href = ''; //redirect to home
          // $window.location.reload();  //same shit     
        });
      }
    };
    // controllerAs: 'ProdusListController'

    $scope.Export = function () {
      html2canvas(document.getElementById('tblWishlist'), {
          onrendered: function (canvas) {
              var data = canvas.toDataURL();
              var docDefinition = {
                  content: [{
                      image: data,
                      width: 500
                  }]
              };
              pdfMake.createPdf(docDefinition).download("Wishlist.pdf");
          }
      });
  }

  }

  function ProdusViewController($scope, $stateParams, Produs) {
    $scope.produs = Produs.get({
      id: $stateParams.id
    }); //Get a single produs.Issues a GET to /api/produse/:id
  }
  // controllerAs: 'ProdusViewController'


  function ProdusCreateController($scope, $state, $stateParams, Produs) {
    $scope.produs = new Produs(); //create new produs instance. Properties will be set via ng-model on UI

    $scope.addProdus = function () { //create a new produs. Issues a POST to /api/produse
      $scope.produs.$save(function () {
        $state.go('wishlist'); // on success go back to home i.e. produse state.
      });
    };

    // controllerAs: 'ProdusCreateController'
  }

  function ProdusEditController($scope, $state, $stateParams, Produs) {

    $scope.updateProdus = function () { //Update the edited produs. Issues a PUT to /api/produse/:id
      $scope.produs.$update(function () {
        $state.go('wishlist'); // on success go back to home i.e. produse state.
      });
    };

    $scope.loadProdus = function () { //Issues a GET request to /api/produse/:id to get a produs to update
      $scope.produs = Produs.get({
        id: $stateParams.id
      });
    };

    $scope.loadProdus(); // Load a produs which can be edited on UI
  }
  // controllerAs: 'ProdusEditController'


// })();