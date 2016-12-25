angular.module('mWarranty')

.controller('LoginCtrl',['$scope','$state','$rootScope','$ionicPopup', function($scope,$state,$rootScope, $ionicPopup) {
    $scope.vendorLogin = function(){
 $ionicPopup.prompt({
   title: 'Login',
   template: 'Enter your secret ID',
   inputType: 'password',
   inputPlaceholder: 'Your unique id'
 }).then(function(res) {
   console.log('Your password is', res);
     $state.go('vendor');
 });
    }
    $scope.facebookLogin = function() {
        $rootScope.spinner = true;
        window.plugins.googleplus.login(
            { 
              'offline': false 
            },
            function (obj) {
              console.log(obj);
              $rootScope.spinner = false; 
              $rootScope.gmailProfile = obj;
              localStorage.setItem("isLogin", true);
              localStorage.setItem("gmailProfile", JSON.stringify(obj));
              $state.go('home');
            },
            function (msg) {
              localStorage.setItem("isLogin", false);
              console.log('err'+msg);
              alert('error: ' + msg);
            }
        );
    }
    
}]);