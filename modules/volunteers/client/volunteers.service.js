// Volunteers service used to communicate Volunteers REST endpoints
(function() {
  'use strict';

  angular
    .module('volunteers')
    .factory('VolunteersService', VolunteersService);

  VolunteersService.$inject = ['$log', '$resource'];

  function VolunteersService($log, $resource) {
    var Volunteer = $resource('/api/volunteers/:volunteerId', {
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

    angular.extend(Volunteer.prototype, {
      createOrUpdate: function () {
        var volunteer = this;
        return createOrUpdate(volunteer);
      }
    });

    return Volunteer;

    function createOrUpdate(volunteer) {
      if (volunteer._id) {
        return volunteer.$update(onSuccess, onError);
      } else {
        return volunteer.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(volunteer) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());
