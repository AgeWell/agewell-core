(function () {
  'use strict';

  angular
    .module('requests.admin')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.requests', {
        abstract: true,
        url: '/requests',
        template: '<ui-view/>'
      })
      .state('admin.requests.list', {
        url: '',
        templateUrl: '/modules/requests/client/admin/views/list-requests.html',
        controller: 'RequestsAdminListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Requests List'
        }
      });
  }
}());
