// Groceries to gos service used to communicate Groceries to gos REST endpoints
(function () {
  'use strict';

  angular
    .module('groceries-to-go')
    .factory('GroceriesToGosService', GroceriesToGosService);

  GroceriesToGosService.$inject = ['$resource'];

  function GroceriesToGosService($resource) {
    return $resource('api/groceries-to-go/:groceriesToGoId', {
      groceriesToGoId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
