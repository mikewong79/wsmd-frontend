(function() {
  "use strict";

  angular
    .module("wsmdApp")
    .config(configure);

  configure.$inject = ["$httpProvider"];

  function configure($httpProvider) {
    $httpProvider.interceptors.push("jsonHeadersService");
    $httpProvider.interceptors.push("tokenSigningService");
    $httpProvider.interceptors.push("authErrorRedirect");
  }

})();
