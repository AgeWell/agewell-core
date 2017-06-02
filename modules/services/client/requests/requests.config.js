(function () {
  'use strict';

  angular
    .module('requests')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {}
}());
