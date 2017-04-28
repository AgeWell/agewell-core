(function() {
  'use strict';

  // Clients controller
  angular
    .module('clients')
    .controller('ClientsController', ClientsController);

  ClientsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'Notification', 'coreService', 'clientResolve'];

  function ClientsController($scope, $state, $window, Authentication, Notification, coreService, client) {
    var vm = this;

    vm.authentication = Authentication;
    vm.client = client;
    vm.options = coreService.getOptions('Client');
    vm.error = null;
    vm.remove = remove;
    vm.save = save;
    vm.toggle = toggle;
    vm.log = log;

    if (!vm.client._id) {
      vm.client.active = true;
      vm.client.groceryCallList = true;
      vm.client.contact = {
        address: {
          city: 'Duluth',
          state: 'MN'
        }
      };
    }

    if (!vm.client.groceryCallList) {
      vm.client.groceryCallList = false;
    }

    function log() {
      console.log(vm);
    }
    log();

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

    function toggle(field) {
      vm.client[field] = !vm.client[field];

      vm.client.$update(successCallback, errorCallback);

      function successCallback(res) {
        console.log(res);
        console.log(vm.client);
        Notification.info({
          message: 'Update successful!'
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
        vm.client[field] = !vm.client[field];
      }
    }
  }
}());
