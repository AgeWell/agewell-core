// Clients service used to communicate Clients REST endpoints
(function() {
  'use strict';

  angular
    .module('clients')
    .factory('ClientsService', ClientsService);

  ClientsService.$inject = ['$resource'];

  function ClientsService($resource) {
    return $resource('/api/clients/:clientId', {
      clientId: '@_id'
    }, {
      get: {
        method: 'GET',
        transformResponse: function(data, headers) {
          data = angular.fromJson(data);
          if (data.contact.birthday) {
            data.contact.birthday = new Date(data.contact.birthday);
          }
          return data;
        }
      },
      update: {
        method: 'PUT'
      }
    });
  }
}());
