(function() {
  'use strict';

angular.module('demoApp')
       .config(function($stateProvider, $urlRouterProvider) {
       
        $urlRouterProvider.otherwise("/session");

        $stateProvider

      .state('home', {
          url: '/',
          templateUrl: 'app/components/authentication/home/index.view.html',
          controller: 'Home.IndexController',
          controllerAs: 'vm'
      })
      .state('login', {
          url: '/login',
          templateUrl: 'app/components/authentication/login/index.view.html',
          controller: 'Login.IndexController',
          controllerAs: 'vm'
      })
       .state('session',{
          url:'/session', 
          component: 'session'  
      })
      .state('wishlist',{
        url:'/wishlist', 
        templateUrl:'app/pages/wishlist/wishlist.template.html',
        controller:"ProdusListController"
      })
        .state('productmanagement',{
          url:'/productmanagement', 
          templateUrl: 'app/pages/productmanagement/productmanagement.template.html'
          })
        .state('pay',{
          url:'/pay', 
        component: 'pay'
        })
        .state('intendant',{
          url:'/intendant', 
          templateUrl: 'app/pages/intendant/intendant.template.html'
        })

        .state('newProdus', { //state for adding a new produs
          url: '/wishlist/produse/new',
          templateUrl:'app/components/product-type-row/templates/produs-add.html',
          controller: 'ProdusCreateController'
          })
        .state('editProdus', { //state for updating a produs
          url: '/wishlist/produse/:id/edit',
          templateUrl:'app/components/product-type-row/templates/produs-edit.html',
          controller: 'ProdusEditController'
        })

        .state('viewProdudus', { //state for showing single produdus
          url: '/productmanagement/produduse/:id/view',
          component: 'produdusView',
        })
        .state('newProdudus', { //state for adding a new produdus
          url: '/productmanagement/produduse/new',
          component: 'produdusCreate',
        })
        .state('editProdudus', { //state for updating a produdus
          url: '/productmanagement/produduse/:id/edit',
          component: 'produdusEdit',
        })


        .state('viewUser', { //state for showing single user
          url: '/intendant/users/:id/view',
          component: 'userView',
        })
        .state('newUser', { //state for adding a new user
          url: '/intendant/users/new',
          component: 'userCreate',
        })
        .state('editUser', { //state for updating a user
          url: '/intendant/users/:id/edit',
          component: 'userEdit',
        })


        .state('newSession', { //state for adding a new session
          url: '/session/sessions/new',
          templateUrl: 'app/components/session-row/templates/session-add.html',

          // component: 'sessionCreate',
          controller: 'SessionCreateController'

        })
        .state('editSession', { //state for updating a session
          url: '/session/sessions/:id/edit',
          templateUrl: 'app/components/session-row/templates/session-edit.html',
          // component: 'sessionEdit',
          controller: 'SessionEditController'
        })

        .state('newGroup', { //state for adding a new session
          url: '/session/groups/new',
          templateUrl: 'pages/intendant/group/templates/group-add.html',

          // component: 'sessionCreate',
          controller: 'GroupCreateController'

        })
        .state('editGroup', { //state for updating a session
          url: '/session/sessions/:id/edit',
          templateUrl: 'pages/intendant/group/templates/group-edit.html',
          // component: 'sessionEdit',
          controller: 'GroupEditController'
        });
        

        })
  //       .run(function($state) {
  //       $state.go('session'); //make a transition to session state when app starts

  //   }
  // );
  .run(function($rootScope, $http, $location, $localStorage, $state) {
    // keep user logged in after page refresh
    if ($localStorage.currentUser) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
    }

    // redirect to login page if not logged in and trying to access a restricted page
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        var publicPages = ['/login','/session','/wishlist','/productmanagement','/productmanagement/produduse/new','/wishlist/produse/new','/pay','/intendant'];
        var restrictedPage = publicPages.indexOf($location.path()) === -1;
        if (restrictedPage && !$localStorage.currentUser) {
            $location.path('/login');
        }
    });
    $state.go('session');
})


})();