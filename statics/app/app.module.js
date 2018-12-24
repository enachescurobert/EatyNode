(function() {
  'use strict';


angular.module('demoApp', [
    'ui.router',
    'ngResource',
    'session',
    'wishlist',
    'pay',
    'ProductManagement',
    'ProductManagement.services',
    'InTendant',
    'inTendant.services',
    'groupControllers',
    'productControllers', //PRODUCT TYPE CONTROLLER  
    'sessionControllers', //injected in Session component  
    'ngMessages', 
    'ngStorage',
    


  ]);


})();                                                                        