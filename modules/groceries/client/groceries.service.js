// Groceries to gos service used to communicate Groceries to gos REST endpoints
(function () {
  'use strict';

  angular
    .module('groceries')
    .factory('GroceriesService', GroceriesService);

  GroceriesService.$inject = ['$resource'];

  function GroceriesService($resource) {
    return $resource('api/groceries/:groceryId', {
      groceriesToGoId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
