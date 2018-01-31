// Rides service used to communicate Rides REST endpoints
(function () {
  'use strict';

  angular
    .module('rides')
    .factory('RidesService', RidesService);

  RidesService.$inject = ['$log', '$resource'];

  function RidesService($log, $resource) {
    var Ride = $resource('/api/rides/:rideId', {
      rideId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Ride.prototype, {
      createOrUpdate: function () {
        var ride = this;
        return createOrUpdate(ride);
      }
    });

    return Ride;

    function createOrUpdate(ride) {
      if (ride._id) {
        return ride.$update(onSuccess, onError);
      } else {
        return ride.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(ride) {
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
