(function () {
  'use strict';

  angular
    .module('groceries.orders')
    .directive('itemsForm', itemsForm);

  function itemsForm() {
    let directive = {
      restrict: 'E',
      scope: {
        items: '=',
        form: '=',
        error: '='
      },
      controller: 'ItemsController',
      controllerAs: 'vm',
      bindToController: true,
      templateUrl: '/modules/groceries/client/views/form-items.html'
    };

    return directive;
  }
}());
