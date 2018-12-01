angular
.module('demoApp')
.controller('userInformations', function($scope, $localStorage){

    if ($localStorage.currentUser) {
        
        $scope.myVar = 'isAuthenticated';

    }


})
