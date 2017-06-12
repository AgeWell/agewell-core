// Groceries to gos service used to communicate Groceries to gos REST endpoints
(function () {
  'use strict';

  angular
    .module('groceries')
    .factory('GroceriesService', GroceriesService);

  GroceriesService.$inject = ['$log', '$resource'];

  function GroceriesService($log, $resource) {
    var Grocery = $resource('api/groceries/:groceryId', {
      groceriesToGoId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Grocery.prototype, {
      createOrUpdate: function () {
        var grocery = this;
        return createOrUpdate(grocery);
      }
    });

    return Grocery;

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
