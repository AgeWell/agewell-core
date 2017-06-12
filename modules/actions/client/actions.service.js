// Actions to gos service used to communicate Actions to gos REST endpoints
(function () {
  'use strict';

  angular
    .module('actions')
    .factory('ActionsService', ActionsService);

  ActionsService.$inject = ['$log', '$resource'];

  function ActionsService($log, $resource) {
    var Action = $resource('/api/actions/:actionId', {
      actionId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Action.prototype, {
      createOrUpdate: function () {
        var action = this;
        return createOrUpdate(action);
      }
    });

    return Action;

    function createOrUpdate(action) {
      if (action._id) {
        return action.$update(onSuccess, onError);
      } else {
        return action.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(action) {
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
