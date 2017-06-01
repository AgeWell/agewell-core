(function() {
  'use strict';

  // Contacts controller
  angular
    .module('contacts.address')
    .controller('AddressController', AddressController);

  AddressController.$inject = ['coreService'];

  function AddressController(coreService) {
    var vm = this;

    vm.options = coreService.getOptions('Address');
    vm.error = null;
    vm.form = {};
  }
}());
