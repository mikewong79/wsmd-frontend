(function() {
  angular.module('wsmdApp')
    .config(MainRouter);

  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

  function MainRouter($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home.html'
      })
      .state('showList', {
        url: '/shows/list',
        templateUrl: "js/shows/show-list.html",
        controller: 'ShowListController',
        controllerAs: 'showListVm'
      })
      .state('showShow', {
        url: '/shows/show/:id',
        templateUrl: 'js/shows/show-show.html',
        controller: 'ShowShowController',
        controllerAs: 'showShowVm'
      })
      .state('showNew', {
        url: '/shows/new',
        templateUrl: 'js/shows/show-new.html',
        controller: 'ShowNewController',
        controllerAs: 'showNewVm'
      })
      .state('showEdit', {
        url: '/shows/edit/:id',
        templateUrl: 'js/shows/show-edit.html',
        controller: 'ShowEditController',
        controllerAs: 'showEditVm'
      })
      .state("signin", {
        url:          "/signin",
        templateUrl:  "/js/auth/signin.html",
        controller:   "SignInController",
        controllerAs: "vm"
      });

    $urlRouterProvider.otherwise('/');
  }
})();
