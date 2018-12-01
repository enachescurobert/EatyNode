// Register `navbar` component, along with its associated controller and template
(function() {
    'use strict';

    angular
        .module('demoApp')
        .component('navbar', {
            templateUrl:'static/app/shared/navbar/navbarField.html',
            controller: function NavbarController() {

            }
        });


    })();