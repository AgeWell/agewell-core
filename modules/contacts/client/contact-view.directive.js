(function () {
  'use strict';

  angular
    .module('contacts')
    .directive('contactView', contactView);

  function contactView() {
    let directive = {
      restrict: 'E',
      scope: {
        contact: '='
      },
      controller: 'ContactsController',
      controllerAs: 'vm',
      bindToController: true,
      templateUrl: '/modules/contacts/client/views/view-contact.html'
    };

    return directive;
  }
}());
