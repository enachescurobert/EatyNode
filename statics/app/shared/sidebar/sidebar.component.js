// Register `sidebar` component, along with its associated controller and template
// (function() {
//     'use strict';

    angular
        .module('demoApp')

        .directive('sideBar', function () {
            return {
                // restrict: 'E',
                templateUrl:'static/app/shared/sidebar/sidebarField.html',
                controller: function($scope, $location) {
                    $scope.isActive = function(path){
                        var currentPath = $location.path().split('/')[1];
                        if (currentPath.indexOf('?') !== -1) {
                            currentPath = currentPath.split('?')[0];
                        }
                        return currentPath === path.split('/')[1];
                    };
                },
            };
        });


    // })();