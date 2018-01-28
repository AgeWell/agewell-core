'use strict';

// Clients service used to communicate Clients REST endpoints
angular
  .module('clients')
  .factory('ClientsService', ClientsService);

ClientsService.$inject = ['$log', '$resource'];

function ClientsService($log, $resource) {
  var Client = $resource('/api/clients/:clientId', {
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

  angular.extend(Client.prototype, {
    createOrUpdate: function () {
      var order = this;
      return createOrUpdate(order);
    }
  });

  return Client;

  function createOrUpdate(client) {
    if (client._id) {
      return client.$update(onSuccess, onError);
    } else {
      return client.$save(onSuccess, onError);
    }

    // Handle successful response
    function onSuccess(client) {
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
