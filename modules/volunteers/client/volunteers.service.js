// Volunteers service used to communicate Volunteers REST endpoints
(function() {
  'use strict';

  angular
    .module('volunteers')
    .factory('VolunteersService', VolunteersService);

  VolunteersService.$inject = ['$resource'];

  function VolunteersService($resource) {
    return $resource('/api/volunteers/:volunteerId', {
      volunteerId: '@_id'
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
