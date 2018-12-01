// (function() {
//   'use strict';
  
angular
.module('InTendant')

.component('userList', {
    templateUrl: 'static/app/pages/intendant/templates/users.html',
    controller: function($scope,popupService, $window, User) 
    {
    // GET : Take everything

    $scope.users = User.query();
  
  
    $scope.deleteUser = function(user) { // Delete a user. Issues a DELETE to /api/users/:id
      if (popupService.showPopup('Really delete this?')) {
        user.$delete(function() {
          $window.location.href = ''; //redirect to home
          // $window.location.reload();  //same shit     
         });
      }
    };
  // controllerAs: 'UserListController'
}  
})

 .component('userView',{
    templateUrl: 'static/app/pages/intendant/templates/user-view.html',
    controller: function($scope,$stateParams, User) {
      $scope.user = User.get({id:$stateParams.id}); //Get a single user.Issues a GET to /api/users/:id
    }
    // controllerAs: 'UserViewController'

  })


  .component('userCreate',{
    templateUrl: 'static/app/pages/intendant/templates/user-add.html',
    controller: function($scope, $state, $stateParams, User) {
      $scope.user = new User();  //create new user instance. Properties will be set via ng-model on UI
      
      $scope.addUser = function() { //create a new user. Issues a POST to /api/users
        $scope.user.$save(function() {
          $state.go('intendant'); // on success go back to home i.e. users state.
        });
      };
      
      // controllerAs: 'UserCreateController'
      },
  })

  
  .component('userEdit',{
    templateUrl: 'static/app/pages/intendant/templates/user-edit.html',  
    controller: function($scope, $state, $stateParams, User) {
   
     $scope.updateUser = function() { //Update the edited user. Issues a PUT to /api/users/:id
     $scope.user.$update(function() {
     $state.go('intendant'); // on success go back to home i.e. users state.
     });
   };
   
   $scope.loadUser = function() { //Issues a GET request to /api/users/:id to get a user to update
   $scope.user = User.get({id:$stateParams.id});
   };
   
   $scope.loadUser(); // Load a user which can be edited on UI
   }
   // controllerAs: 'UserEditController',
  })

// function UserListController(popupService, $window, User) 
//     {
//     // GET : Take everything
//     var $scope = this;
//     $scope.users = User.query();
  
  
//     $scope.deleteUser = function(user) { // Delete a user. Issues a DELETE to /api/users/:id
//       if (popupService.showPopup('Really delete this?')) {
//         user.$delete(function() {
//           $window.location.href = ''; //redirect to home
//           // $window.location.reload();  //same shit     
//          });
//       }
//     };
//   // controllerAs: 'UserListController'
// }




// function UserViewController($stateParams, User) {
//   var $scope = this;
//   $scope.user = User.get({id:$stateParams.id}); //Get a single user.Issues a GET to /api/users/:id
// }
// // controllerAs: 'UserViewController'




// function UserCreateController($state, $stateParams, User) {
// var $scope = this;
// $scope.user = new User();  //create new user instance. Properties will be set via ng-model on UI

// $scope.addUser = function() { //create a new user. Issues a POST to /api/users
//   $scope.user.$save(function() {
//     $state.go('intendant'); // on success go back to home i.e. users state.
//   });
// };

// // controllerAs: 'UserCreateController'
// }



// function UserEditController($state, $stateParams, User) {
//    var $scope = this;

//   $scope.updateUser = function() { //Update the edited user. Issues a PUT to /api/users/:id
//   $scope.user.$update(function() {
//   $state.go('intendant'); // on success go back to home i.e. users state.
//   });
// };

// $scope.loadUser = function() { //Issues a GET request to /api/users/:id to get a user to update
// $scope.user = User.get({id:$stateParams.id});
// };

// $scope.loadUser(); // Load a user which can be edited on UI
// }
// // controllerAs: 'UserEditController'





// })();