angular.module('mWarranty')

.controller('HomeCtrl',['$scope','dataFactory','$ionicSideMenuDelegate','$state','$rootScope', function($scope,dataFactory,$ionicSideMenuDelegate,$state,$rootScope) {
    
    $scope.homeInit = function(){
        var isLogin = localStorage.getItem('isLogin');
        if(isLogin === undefined || isLogin === 'undefined' || isLogin === false || isLogin === null){
           $state.go('login')
        }else{
            var obj = localStorage.getItem('gmailProfile');
            $rootScope.gmailProfile = JSON.parse(obj);
            $rootScope.spinner = true;
            dataFactory.getHomelist().then(function(response){
                $rootScope.spinner = false;
                console.log(response);
                if(response.statusText === "OK" && (response.data.total_rows >= 1)){
                    $scope.isDataAvailable = true;
                    $scope.itemData = response.data.rows;
                }else{
                    $scope.noData = "No data available."
                }
            }, function(err){
                $rootScope.spinner = false;
                console.log('err'+err);
            });
        }

    }
    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
    $scope.warrantySelect = function(item){
        $rootScope.spinner = true;
        $state.go('details', {itemDetails: JSON.stringify(item)})
    }

}]);