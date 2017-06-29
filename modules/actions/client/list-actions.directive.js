(function () {
  'use strict';

  angular
    .module('actions')
    .directive('listActions', listActions);

  function listActions() {
    var directive = {
      restrict: 'E',
      scope: {
        clientId: '='
      },
      controller: 'ActionsListController',
      controllerAs: 'vm',
      bindToController: true,
      replace: true,
      transclude: true,
      templateUrl: '/modules/actions/client/views/list-actions.html'
    };

    return directive;
  }
}());
