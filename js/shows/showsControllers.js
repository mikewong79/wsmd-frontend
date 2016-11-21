(function() {
  angular.module('wsmdApp')
    .controller("ShowListController", ShowListController)
    .controller("ShowShowController", ShowShowController)
    .controller("ShowNewController", ShowNewController)
    .controller("ShowEditController", ShowEditController);

    ShowListController.$inject = ['ShowResource', '$http'];
    ShowShowController.$inject = ['ShowResource', '$stateParams'];
    ShowNewController.$inject = ['ShowResource', '$state'];
    ShowEditController.$inject = ['ShowResource', '$stateParams', '$state'];

    function ShowListController(ShowResource, $http) {
      var vm = this;
      vm.shows = [];
      vm.destroy = destroy;

      // Simple GET request example:
      $http({
        method: 'GET',
        url: 'http://stats.nba.com/stats/homepagev2?GameScope=Season&LeagueID=00&PlayerOrTeam=Player&PlayerScope=All+Players&Season=2016-17&SeasonType=Regular+Season&StatType=Traditional'
      }).then(function successCallback(response) {
          console.log(response)
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });

      // ShowResource.query().$promise.then(function(shows) {
      //   vm.shows = shows;
      // });

      function destroy(showToDelete) {
        ShowResource.delete({id: showToDelete.id}).$promise.then(function (response) {
          console.log(response.message);
          vm.shows = vm.shows.filter(function(show) {
            return show != showToDelete;
          });
        });
      }
    }

    function ShowShowController(ShowResource, $stateParams) {
      var vm = this;
      vm.show = {};

      ShowResource.get({id: $stateParams.id}).$promise.then(function(jsonShow) {
          vm.show = jsonShow;
      });
    }

    function ShowNewController(ShowResource, $state) {
      var vm = this;
      vm.newShow = {};
      vm.addShow = addShow;

      function addShow() {
        ShowResource.save(vm.newShow).$promise.then(function(jsonShow) {
          vm.newShow = {};
          $state.go('showShow', {id: jsonShow.id});
        });
      }
    }

    function ShowEditController(ShowResource, $stateParams, $state) {
      var vm = this;
      vm.show = {};
      vm.editShow = editShow;

      ShowResource.get({id: $stateParams.id}).$promise.then(function(jsonShow) {
          vm.show = jsonShow;
      });

      function editShow() {
        ShowResource.update({id: vm.show.id}, vm.show).$promise.then(function(updatedShow) {
          vm.show = updatedShow;
          $state.go('showShow', {id: updatedShow.id});
        });
      }
    }

})();
