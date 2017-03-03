(function () {
  'use strict';

  angular
    .module('contacts')
    .directive('contactInformation', contactInformation);

  function contactInformation() {
    var directive = {
      restrict: 'E',
      scope: {
        contact: '='
      },
      controller: 'ContactController',
      controllerAs: 'vm',
      templateUrl: 'my-pane.html'
    };

    return directive;
  }
}());
