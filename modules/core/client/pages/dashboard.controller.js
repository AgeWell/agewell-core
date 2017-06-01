(function() {
  'use strict';

  angular
    .module('core')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$scope', '$state', '$window', '$filter', '$uibModal', 'Authentication', 'Notification', 'coreService', 'ClientsService', 'ActionsService', 'OrdersService'];

  function DashboardController($scope, $state, $window, $filter, $uibModal, Authentication, Notification, coreService, ClientsService, ActionsService, OrdersService) {
    var vm = this;
    vm.options = coreService.getOptions('Order');
    vm.approve = approve;
    vm.skip = skip;
    vm.setFilter = setFilter;
    vm.complete = complete;
    vm.callList = [];
    vm.orders = [];
    vm.actions = [];
    vm.ordersFilter = 'ordered';

    vm.isAdmin = Authentication.user.roles.some(function(role) {
      return role === 'admin';
    });

    vm.dates = {
      now: new Date(),
      orderBy: new Date(vm.options.order[0]),
      nextOrderBy: new Date(vm.options.order[1]),
      delivery: new Date(vm.options.delivery[0]),
      nextDelivery: new Date(vm.options.delivery[1])
    };

    ClientsService.query({
      active: true,
      groceryCallList: true,
      lastSkip: vm.dates.orderBy,
      lastOrder: vm.dates.orderBy
    }, function(data) {
      vm.callList = data;
      buildPager('callList', 6);
    });


    function skip(client) {
      var modalInstance = $uibModal.open({
        animation: true,
        template: '<div class="modal-header"><h3 class="modal-title">Skip order</h3></div>' +
          '<div class="modal-body">Does this client want to skip ordering this week?</div>' +
          '<div class="modal-footer">' +
          '<button class="btn btn-warning" type="button" ng-click="vm.modalOk()">OK</button>' +
          '<button class="btn btn-default" type="button" ng-click="vm.modalCancel()">Cancel</button>' +
          '</div>',
        scope: $scope
      });

      vm.modalOk = function() {
        modalInstance.close('OK Clicked');
      };
      vm.modalCancel = function() {
        modalInstance.dismiss('Cancel Clicked');
      };

      modalInstance.result.then(function() {
        client.lastSkip = vm.dates.orderBy;

        client.$update(successCallback, errorCallback);

        function successCallback(res) {
          Notification.info({
            message: 'Update successful!'
          });
          pageChanged('callList', 6);
        }

        function errorCallback(res) {
          vm.error = res.data.message;
        }
      }, function() {
        console.info('modal-component dismissed at: ' + new Date());
      });
    }

    OrdersService.query({
      // active: true,
      // groceryCallList: true,
      // date: vm.dates.orderBy
    }, function(data) {
      vm.orders = data;
      buildPager('orders', 5);
    });

    // Pages related functions
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;
    vm.itemsPerPage = 6;

    function buildPager(type, per) {
      vm['paged' + type] = [];
      vm[type + 'Page'] = 1;
      vm[type + 'PerPage'] = per;
      vm.figureOutItemsToDisplay(type);
    }

    function figureOutItemsToDisplay(type) {
      vm['filtered' + type] = $filter('filter')(vm[type], {
        $: vm[type + 'Filter']
      });
      vm['filter' + type + 'Length'] = vm['filtered' + type].length;
      var begin = ((vm[type + 'Page'] - 1) * vm[type + 'PerPage']);
      var end = begin + vm[type + 'PerPage'];
      vm['paged' + type] = vm['filtered' + type].slice(begin, end);
      console.log(vm['paged' + type]);
    }

    function pageChanged(type) {
      vm.figureOutItemsToDisplay(type);
    }

    function setFilter(value) {
      vm.ordersFilter = value;
      vm.figureOutItemsToDisplay('orders');
    }

    ActionsService.query({
      completed: false
    }, function(data) {
      vm.actions = data;
      buildPager('actions', 3);
    });

    function complete(action) {
      action.completed = !action.completed;

      action.$update(successCallback, errorCallback);

      function successCallback(res) {
        Notification.info({
          message: 'Update successful!'
        });
        pageChanged('actions', 3);
      }

      function errorCallback(res) {
        vm.error = res.data.message;
        action.completed = !action.completed;
      }
    }

    function approve(order) {
      order.status = 'ordered';

      order.$update(successCallback, errorCallback);

      function successCallback(res) {
        Notification.info({
          message: 'Update successful!'
        });
        pageChanged('callList', 6);
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
