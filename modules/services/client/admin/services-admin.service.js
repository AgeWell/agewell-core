(function () {
  'use strict';

  // TODO this should be Services service
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
