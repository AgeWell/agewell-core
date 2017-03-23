(function() {
  'use strict';

  /* Creates a mock of socket.io for the browser.
   * Functionality of the service is tested through
   * the chat controller tests.
   */

  let ngInjector = angular.injector(['ng']),
    $window = ngInjector.get('$window');

  let mock = function () {
    let io = {
      cbs: {},
      connect: connect,
      emit: emit,
      on: on,
      removeListener: removeListener
    };

    connect();

    return io;

    function connect() {
      io.socket = {};
    }

    function emit(msg, data) {
      io.cbs[msg](data);
    }

    function on(msg, cb) {
      io.cbs[msg] = cb;
    }

    function removeListener(msg) {
      delete io.cbs[msg];
    }
  };

  $window.io = mock;
}());
