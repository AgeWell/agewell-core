(function () {
  'use strict';

  angular
    .module('requests.admin')
    .controller('RequestsAdminController', RequestsAdminController);

  RequestsAdminController.$inject = ['$scope', '$state', '$window', 'Authentication', 'coreService', 'serviceResolve', 'Notification'];

  function RequestsAdminController($scope, $state, $window, Authentication, coreService, service, Notification) {
    var vm = this;

    vm.authentication = Authentication;
    vm.request = service;
    vm.options = coreService.getOptions('Service');
    vm.error = null;
    vm.remove = remove;
    vm.save = save;

    console.log(vm);

    function remove(service) {
      if ($window.confirm('Are you sure you want to delete this service?')) {
        if (service) {
          service.$remove();

          vm.requests.splice(vm.requests.indexOf(service), 1);
          Notification.success('Service deleted successfully!');
        } else {
          vm.request.$remove(function () {
            $state.go('admin.requests');
            Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Service deleted successfully!' });
          });
        }
      }
    }

    function save(isValid) {

      console.log(vm);

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.requestForm');

        return false;
      }

      if (vm.request._id) {
        vm.request.$update(successCallback, errorCallback);
      } else {
        vm.request.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('admin.requests.view', {
          serviceId: res._id
        });
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Service saved successfully!' });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Service update error!' });
      }
    }
  }
}());
