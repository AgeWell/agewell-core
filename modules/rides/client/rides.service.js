// Rides service used to communicate Rides REST endpoints
(function () {
  'use strict';

  angular
    .module('rides')
    .factory('RidesService', RidesService);

  RidesService.$inject = ['$log', '$resource'];

  function RidesService($log, $resource) {
    var Ride = $resource('api/rides/:groceryId', {
      rideId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Ride.prototype, {
      createOrUpdate: function () {
        var grocery = this;
        return createOrUpdate(grocery);
      }
    });

    return Ride;

    function createOrUpdate(grocery) {
      if (grocery._id) {
        return grocery.$update(onSuccess, onError);
      } else {
        return grocery.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(grocery) {
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
