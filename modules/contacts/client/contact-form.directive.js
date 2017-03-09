(function () {
  'use strict';

  angular
    .module('contacts')
    .directive('contactForm', contactForm);

  function contactForm() {
    var directive = {
      restrict: 'E',
      scope: {
        contact: '=',
        form: '=',
        error: '='
      },
      controller: 'ContactsController',
      controllerAs: 'vm',
      bindToController: true,
      templateUrl: '/modules/contacts/client/views/form-contact.html'
    };

    return directive;
  }
}());
