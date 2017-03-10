(function () {
  'use strict';

  angular
    .module('contacts')
    .controller('ContactsListController', ContactsListController);

  ContactsListController.$inject = ['ContactsService'];

  function ContactsListController(ContactsService) {
    let vm = this;

    vm.contacts = ContactsService.query();
  }
}());
