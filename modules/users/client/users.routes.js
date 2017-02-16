(function () {
  'use strict';

  // Setting up route
  angular
    .module('users.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    // Users state routing
    $stateProvider
      .state('authentication', {
        url: '/authentication',
        templateUrl: '/client/users/authentication/authentication.tpl.html',
        controller: 'AuthenticationController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Signin'
        }
      });
  }
}());
