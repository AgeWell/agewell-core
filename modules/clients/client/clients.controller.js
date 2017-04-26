(function () {
  'use strict';

  // Clients controller
  angular
    .module('clients')
    .controller('ClientsController', ClientsController);

  ClientsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'Notification', 'coreService', 'clientResolve'];

  function ClientsController ($scope, $state, $window, Authentication, Notification, coreService, client) {
    var vm = this;

    vm.authentication = Authentication;
    vm.client = client;
    vm.options = coreService.getOptions('Client');
    vm.error = null;
    vm.remove = remove;
    vm.save = save;
    vm.toggleCallList = toggleCallList;

    if (!vm.client._id) {
      vm.client.contact = {};
    }

    if (!vm.client.groceryCallList) {
      vm.client.groceryCallList = false;
    }
    console.log(vm.client);

    // Remove existing Client
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.client.$remove($state.go('clients.list'));
      }
    }

    // Save Client
    function save(isValid) {

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.clientForm');
        return false;
      }


      // TODO: move create/update logic to service
      if (vm.client._id) {
        vm.client.$update(successCallback, errorCallback);
      } else {
        vm.client.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('clients.view', {
          clientId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    function toggleCallList() {
      vm.client.groceryCallList = !vm.client.groceryCallList;

      vm.client.$update(successCallback, errorCallback);

      function successCallback(res) {
        console.log(res);
        console.log(vm.client);
        Notification.info({ message: 'Update successful!' });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
        vm.client.groceryCallList = !vm.client.groceryCallList;
      }
    }
  }
}());
