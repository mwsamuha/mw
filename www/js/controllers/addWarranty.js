angular.module('mWarranty')

.controller('AddCtrl',['$scope','ionicDatePicker','$cordovaCamera','dataFactory','$rootScope','$cordovaBarcodeScanner', function($scope,ionicDatePicker,$cordovaCamera,dataFactory,$rootScope,$cordovaBarcodeScanner) {
    $scope.addInit = function(){
        
        $scope.categorySelectables = ['Electronics','Mobile Phones','Tablets','Home Appliances', 'Camera','Accessories' ];
        $scope.vendorSelectables = ['Acer','Apple','ASUS','Dell','HP','Microsoft','Samsung','LG','Haier','Whirlpool',
                                    'Toshiba','Lenovo','Fujitsu','Canon','Nikon','Sony','Kodak','Fujifilm','Polaroid',
                                    'Nest','D-Link','Wink'];
        $scope.warrantySelectables = [1,2,3,4,5,6,12,24,36,48,60];
        /*'Acer','Apple','ASUS','Dell','HP','Microsoft','Samsung','LG','Haier','Whirlpool','Toshiba','Lenovo','Fujitsu','Canon','Nikon','Sony','Kodak','Fujifilm','Polaroid','Nest','D-Link','Wink'*/

        $scope.ipObj = {
          callback: function (val) {  //Mandatory
            console.log('Return value from the datepicker popup is : ' + val, new Date(val));
            $scope.dateVal = val;
            $scope.dop = (new Date(val).getMonth() + 1) + '/' + new Date(val).getDate() + '/' +  new Date(val).getFullYear();
          },
          disabledDates: [            //Optional
            new Date(2016, 2, 16),
            new Date(2015, 3, 16),
            new Date(2015, 4, 16),
            new Date(2015, 5, 16),
            new Date('Wednesday, August 12, 2015'),
            new Date(1439676000000)
          ],
          from: new Date(2012, 1, 1), //Optional
          to: new Date(), //Optional
          inputDate: new Date(),      //Optional
          mondayFirst: true,          //Optional
          disableWeekdays: [0],       //Optional
          closeOnSelect: false,       //Optional
          templateType: 'popup'       //Optional
        };
    }


    $scope.openDatePicker = function(){
      ionicDatePicker.openDatePicker($scope.ipObj);
    };
    
    $scope.captureBill = function(){
        var options = {
          quality: 50,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false,
          correctOrientation:true
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
          var image = document.getElementById('myImage');
          image.src = "data:image/jpeg;base64," + imageData;
          $scope.captureImg = "data:image/jpeg;base64," + imageData;
          console.log("capture: " +$scope.captureImg);
          $scope.showCapture = true;
        }, function(err) {
          // error
        });
    }
    
    $scope.submitWarranty = function(itemName,category,vendor,warranty){
        var exp = new Date($scope.dateVal);
        exp.setMonth(exp.getMonth() + Number(warranty));
        var exp_date = (new Date(exp).getMonth() + 1) + '/' + new Date(exp).getDate() + '/' +  new Date(exp).getFullYear();
        $rootScope.spinner = true;
        var submitParam = {
          "_id": (Math.round(+new Date()/1000)).toString(),
          "item_name": itemName,
          "billing_date": $scope.dop,
          "exp_date": exp_date,
          "shop_name": vendor,
          "category": category,
          "email": "jagancsmj@gmail.com",//gmailProfile.email,
          "image_data": $scope.captureImg
        }
        console.log("submitParam: "+JSON.stringify(submitParam));
        dataFactory.addItem(submitParam);
        
    }
    
    $scope.scanQR = function(){
        $cordovaBarcodeScanner
          .scan()
          .then(function(barcodeData) {
            $scope.itemName = barcodeData.text;
            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                $scope.$apply();
            }
            alert("Scanned Items -"+barcodeData.text);
            console.log("scanned"+JSON.stringify(barcodeData));
          }, function(error) {
            console.log(JSON.stringify(error));
          });
    }
/*  SAFE APPLY
    if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
        $scope.$apply();
    }*/
    
}]);