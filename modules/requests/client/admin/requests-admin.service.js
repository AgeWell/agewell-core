(function () {
  'use strict';

  // TODO this should be Requests service
  angular
    .module('requests.admin')
    .factory('RequestsAdminService', RequestsAdminService);

  RequestsAdminService.$inject = ['$resource'];

  function RequestsAdminService($resource) {
    return $resource('/api/services/:serviceId', {
      serviceId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
