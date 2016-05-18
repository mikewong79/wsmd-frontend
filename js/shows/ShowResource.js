(function() {
  angular.module('wsmdApp')
    .factory("ShowResource", ShowResource);

  ShowResource.$inject = ['$resource'];

  function ShowResource($resource) {
    return $resource(
      "https://wsmd-rails-backend.herokuapp.com/api/shows/:id",
      {id: '@id'}, {
        'update': { method: 'PUT'}
      }
    );
  }
})();
