(function () {
  'use strict';

  // TODO this should be Services service
  angular
    .module('services.admin')
    .factory('ServiceAdminService', ServiceAdminService);

  ServiceAdminService.$inject = ['$resource'];

  function ServiceAdminService($resource) {
    return $resource('/api/services/:serviceId', {
      serviceId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
