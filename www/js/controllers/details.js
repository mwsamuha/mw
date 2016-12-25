angular.module('mWarranty')

.controller('DetailsCtrl',['$scope','$state','$rootScope', function($scope,$state,$rootScope) {
    
$scope.detailsInit =function(){
    $rootScope.spinner = false;
    console.log(JSON.stringify($state.params.itemDetails));
    $scope.selectedItem = JSON.parse($state.params.itemDetails);
    var image = document.getElementById('myImage');
    image.src = $scope.selectedItem.doc.image_data;
    var thumbImage = document.getElementById('myThumb');
    thumbImage.src = $scope.selectedItem.doc.image_data;
    console.log("capture display"+$scope.selectedItem.doc.image_data)
}

$scope.downloadRecipt = function(){
    //$rootScope.spinner = true;
    downloadBGImages($scope.selectedItem.doc.item_name,$scope.selectedItem.doc.image_data,successCallback,errorCallback)
    function successCallback(response){
        alert("Downloaded Successfully");
        $scope.item_name = response.text;
        $rootScope.spinner = false;
    };
    function errorCallback(err){
        $rootScope.spinner = false;
        console.log("err"+err);
    };
}

  var downloadBGImages = function (fileName, url, successMethod, errorMethod) {
            var path = cordova.file.externalDataDirectory;
            fileName = fileName + ".jpg";
              var perc;
            path = path + "mWarranty/";
            imgName = path + fileName;
            var fileTransfer = new FileTransfer();
            var uri = encodeURI(url);
             var isDownloaded = false;
            fileTransfer.download(
                    uri,
                    imgName,
                    function (entry) {
                        if(perc == "100"){
                            successMethod(fileName);
                            $rootScope.spinner = false;
                        }
                    },
                    function (error) {
                        errorMethod();
                        $rootScope.spinner = false;
                    },
                    false, false);

     fileTransfer.onprogress = function(progressEvent) {
            if (progressEvent.lengthComputable) {
         perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
            }
    };
           //  return isDownloaded;
    };
}]);