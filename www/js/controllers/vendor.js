angular.module('mWarranty')

.controller('VendorCtrl',['$scope','dataFactory','$ionicSideMenuDelegate','$state','$rootScope', function($scope,dataFactory,$ionicSideMenuDelegate,$state,$rootScope) {
    
    $scope.vendorInit = function(){

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

}]);