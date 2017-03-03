(function() {
  'use strict';

  // Contacts controller
  angular
    .module('contacts')
    .controller('ContactsController', ContactsController);

  function ContactsController() {
    var vm = this;

    vm.error = null;
    vm.form = {};
  }
}());
