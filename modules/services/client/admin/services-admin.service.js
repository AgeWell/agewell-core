(function () {
  'use strict';

  angular
    .module('services.admin')
    .factory('ServicesAdminService', ServicesAdminService);

  ServicesAdminService.$inject = ['$resource'];

  function ServicesAdminService($resource) {
    return $resource('/api/services/:serviceId', {
      serviceId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
