angular.module('sessionControllers', [])
  .factory('Session', function ($resource) {
    return $resource('/Purchase/sessions/:id/', {
      id: '@id'
    }, {
      update: {
        method: 'PUT'
      },
    }, {
      stripTrailingSlashes: false
    });
  })
  .service('popupService', function ($window) {
    this.showPopup = function (message) {
      return $window.confirm(message);
    }
  })

  .controller('SessionListController', function ($scope, popupService, $window, Session) {
    // GET : Take everything
    $scope.sessions = Session.query();

    $scope.deleteSession = function (session) { // Delete a session. Issues a DELETE to /api/sessions/:id
      if (popupService.showPopup('Really delete this?')) {
        session.$delete(function () {
          $window.location.href = ''; //redirect to home
          // $window.location.reload();  //same shit     
        });
      }
    };
    // controllerAs: 'SessionListController'

    $scope.Export = function () {
      html2canvas(document.getElementById('tblSession'), {
          onrendered: function (canvas) {
              var data = canvas.toDataURL();
              var docDefinition = {
                  content: [{
                      image: data,
                      width: 500,

                  }]
              };
              pdfMake.createPdf(docDefinition).download("Session.pdf");
          }
      });
  }
  $scope.resetSession = function() {
    if (popupService.showPopup('Are you sure you want to reset the session for all the users?')) {
    angular.forEach($scope.sessions, function(item) {
      item["cake"] = 0;
      item["coffe"] = 0;
      item.$update();
    })
    // $scope.$apply();
  }}
  
  })
  .controller('SessionViewController',
    function ($scope, $stateParams, Session) {
      $scope.session = Session.get({
        id: $stateParams.id
      }); //Get a single session.Issues a GET to /api/sessions/:id
    }
  )

  .controller('SessionCreateController',
    function ($scope, $state, $stateParams, Session) {
      $scope.session = new Session(); //create new session instance. Properties will be set via ng-model on UI

      $scope.addSession = function () { //create a new session. Issues a POST to /api/sessions
        $scope.session.$save(function () {
          $state.go('session'); // on success go back to home i.e. sessions state.
        });
      };
      // controllerAs: 'SessionCreateController'
    }
  )

  .controller('SessionEditController',
    function ($scope, $state, $stateParams, Session) {

      $scope.updateSession = function () { //Update the edited session. Issues a PUT to /api/sessions/:id
        $scope.session.$update(function () {
          $state.go('session'); // on success go back to home i.e. sessions state.
        });
      };

      $scope.loadSession = function () { //Issues a GET request to /api/sessions/:id to get a session to update
        $scope.session = Session.get({
          id: $stateParams.id
        });
      };

      $scope.loadSession(); // Load a session which can be edited on UI     
    }
  )
  .controller('DownloadTable', function($scope) {
    $scope.name = 'World';
    
          $scope.exportAction = function (option) {
            switch (option) {
                case 'pdf': $scope.$broadcast('export-pdf', {}); 
                    break; 
                case 'excel': $scope.$broadcast('export-excel', {});
                    break; 
                case 'doc': $scope.$broadcast('export-doc', {});
                    break;
                case 'csv': $scope.$broadcast('export-csv', {});
                    break;
                default: console.log('no event caught'); 
            }
        }
              
  })
         .directive('exportTable', function(){
            var link = function ($scope, elm, attr) {
              $scope.$on('export-pdf', function (e, d) {
                  elm.tableExport({ type: 'pdf', escape: false });
              });
              $scope.$on('export-excel', function (e, d) {
                  elm.tableExport({ type: 'excel', escape: false });
              });
              $scope.$on('export-doc', function (e, d) {
                  elm.tableExport({ type: 'doc', escape: false });
              });
              $scope.$on('export-csv', function (e, d) {
                  elm.tableExport({ type: 'csv', escape: false });
              });
          }
          return {
              restrict: 'C',
              link: link
          }
  });
  