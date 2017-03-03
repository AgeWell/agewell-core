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

    // Gets all the poible values for a select list.
    function getOptions(model) {
      if (options.hasOwnProperty(model)) {
        return options[model];
      }
      return console.error('Model has no options.');
    }

    function init() {
      // A private function for rendering decision
      options = $window.options;
    }
  }
}());
