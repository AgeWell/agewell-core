(function () {
  'use strict';

  // Requests controller
  angular
    .module('requests')
    .controller('RequestsController', RequestsController);

  RequestsController.$inject = ['$scope', '$state', '$stateParams', '$window', 'Authentication', 'requestResolve', 'requestService'];

  function RequestsController ($scope, $state, $stateParams, $window, Authentication, request, service) {
    var vm = this;

    vm.authentication = Authentication;
    vm.request = request;
    vm.service = service;
    vm.error = null;
    vm.remove = remove;
    vm.save = save;

    console.log($stateParams);
    console.log(vm);

    // Remove existing Request
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.request.$remove($state.go('requests.list'));
      }
    }

    // Save Request
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.requestForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.request._id) {
        vm.request.$update(successCallback, errorCallback);
      } else {
        vm.request.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('requests.view', {
          requestId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
