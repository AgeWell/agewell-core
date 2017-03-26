// Groceries to gos service used to communicate Groceries to gos REST endpoints
(function () {
  'use strict';

  angular
    .module('groceriesToGo')
    .factory('GroceriesToGosService', GroceriesToGosService);

  GroceriesToGosService.$inject = ['$resource'];

  function GroceriesToGosService($resource) {
    return $resource('api/groceries/:groceryId', {
      groceriesToGoId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
