(function () {
  'use strict';

  angular
    .module('contacts.address')
    .directive('address', address);

  function address() {
    let directive = {
      restrict: 'E',
      scope: {
        address: '=',
        error: '='
      },
      controller: 'AddressController',
      controllerAs: 'vm',
      bindToController: true,
      templateUrl: '/modules/contacts/client/address/views/form-address.html'
    };

    return directive;
  }
}());
