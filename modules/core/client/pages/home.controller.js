(function() {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$state', '$uibModal', 'Authentication'];

  function HomeController($state, $uibModal, Authentication) {
    var vm = this;

    vm.authentication = Authentication;

    if (vm.authentication.user && vm.authentication.user.roles.indexOf('volunteer') !== -1 && vm.authentication.user.active) {
      return $state.go('groceries.list');
    }

    if (vm.authentication.user && vm.authentication.user.active) {
      return $state.go('dashboard');
    }

    vm.open = function(parentSelector) {
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        template: '<div class="modal-header">' +
          '<h3 class="modal-title" id="modal-title-{{name}}">The {{name}} modal!</h3>' +
          '</div>' +
          '<div class="modal-body" id="modal-body-{{name}}">' +
          'Having multiple modals open at once is probably bad UX but it\'s technically possible.' +
          '</div>',
        size: 'sm'
      });
    };
  }
}());
