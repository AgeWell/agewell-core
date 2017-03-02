// Volunteers service used to communicate Volunteers REST endpoints
(function () {
  'use strict';

  angular
    .module('volunteers')
    .factory('VolunteersService', VolunteersService);

  VolunteersService.$inject = ['$resource'];

  function VolunteersService($resource) {
    return $resource('/api/volunteers/:volunteerId', {
      volunteerId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
