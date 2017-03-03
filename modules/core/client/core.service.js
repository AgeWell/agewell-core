(function() {
  'use strict';

  angular
    .module('core')
    .factory('coreService', coreService);

  coreService.$inject = ['$window'];

  function coreService($window) {
    var options;
    var service = {
      getOptions: getOptions
    };

    init();

    return service;

    // Add new menu object by menu id
    function getOptions(model, field) {

      // Return the menu object
      return model + ' ' + field;
    }

    function init() {
      // A private function for rendering decision
      options = $window.options;
    }
  }
}());
