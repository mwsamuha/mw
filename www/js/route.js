angular.module('mWarranty')

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
  
  $ionicConfigProvider.views.maxCache(0);
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('login', {
    url: '/login',
    cache: false,
    controller: 'LoginCtrl',
    templateUrl: 'views/login.html'
  })
  .state('profile', {
    url: '/profile',
    cache: false,
    controller: 'ProfileCtrl',
    templateUrl: 'views/profile.html'
  })
  .state('add', {
    url: '/add',
    cache: false,
    controller: 'AddCtrl',
    templateUrl: 'views/addWarranty.html'
  })
  .state('details', {
    url: '/details/:itemDetails',
    cache: false,
    controller: 'DetailsCtrl',
    templateUrl: 'views/details.html'
  })
  .state('support', {
    url: '/support',
    cache: false,
    controller: 'SupportCtrl',
    templateUrl: 'views/support.html'
  })
   .state('vendor', {
    url: '/vendor',
    cache: false,
    controller: 'VendorCtrl',
    templateUrl: 'views/vendor.html'
  })
  .state('home', {
    url: '/home',
    cache: false,
    controller: 'HomeCtrl',
    templateUrl: 'views/home.html'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');

});