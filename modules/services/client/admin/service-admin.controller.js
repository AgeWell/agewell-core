(function () {
  'use strict';

  angular
    .module('services.admin')
    .controller('ServicesAdminController', ServicesAdminController);

  ServicesAdminController.$inject = ['$scope', '$state', '$window', 'Authentication', 'coreService', 'serviceResolve', 'Notification'];

  function ServicesAdminController($scope, $state, $window, Authentication, coreService, service, Notification) {
    var vm = this;

    vm.authentication = Authentication;
    vm.service = service;
    vm.options = coreService.getOptions('Service');
    vm.error = null;
    vm.remove = remove;
    vm.save = save;

    function remove(service) {
      if ($window.confirm('Are you sure you want to delete this service?')) {
        if (service) {
          service.$remove();

          vm.services.splice(vm.services.indexOf(service), 1);
          Notification.success('Service deleted successfully!');
        } else {
          vm.service.$remove(function () {
            $state.go('admin.services');
            Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Service deleted successfully!' });
          });
        }
      }
    }

    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.serviceForm');

        return false;
      }

      if (vm.service._id) {
        vm.service.$update(successCallback, errorCallback);
      } else {
        vm.service.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('admin.services.view', {
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
