angular.module('groupControllers', [])
       .factory('Group', function($resource) {
    return $resource('/Purchase/groups/:id/',{id:'@id'},{
        update: {method:'PUT'},
    },{

    
    stripTrailingSlashes: false
  });
})
       .service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
})

.controller('GroupListController', function($scope,popupService, $window, Group) 
{
// GET : Take everything

$scope.groups = Group.query();


$scope.deleteGroup = function(group) { // Delete a group. Issues a DELETE to /api/groups/:id
  if (popupService.showPopup('Really delete this?')) {
    group.$delete(function() {
      $window.location.href = ''; //redirect to home
      // $window.location.reload();  //same shit     
     });
  }
};
// controllerAs: 'GroupListController'
}  

)

.controller('GroupViewController', 
function($scope,$stateParams, Group) {
    $scope.group = Group.get({id:$stateParams.id}); //Get a single group.Issues a GET to /api/groups/:id
  }
)

.controller('GroupCreateController', 
function($scope, $state, $stateParams, Group) {
    $scope.group = new Group();  //create new group instance. Properties will be set via ng-model on UI
    
    $scope.addGroup = function() { //create a new group. Issues a POST to /api/groups
      $scope.group.$save(function() {
        $state.go('intendant'); // on success go back to home i.e. groups state.
      });
    };
    
    // controllerAs: 'GroupCreateController'
    }
)

.controller('GroupEditController', 
function($scope, $state, $stateParams, Group) {
   
    $scope.updateGroup = function() { //Update the edited group. Issues a PUT to /api/groups/:id
    $scope.group.$update(function() {
    $state.go('intendant'); // on success go back to home i.e. groups state.
    });
  };
  
  $scope.loadGroup = function() { //Issues a GET request to /api/groups/:id to get a group to update
  $scope.group = Group.get({id:$stateParams.id});
  };
  
  $scope.loadGroup(); // Load a group which can be edited on UI
  }

)
