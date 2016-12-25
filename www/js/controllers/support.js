angular.module('mWarranty')

.controller('SupportCtrl',['$scope','Base64','$http', function($scope,Base64,$http) {

    
    $scope.messages = [];
    $scope.clearSearch = function(){
        $scope.sendText = "";
    }
    $scope.sendMessage = function(sendText){
        
        $scope.messages.push({
            textData : sendText,
            textClass : 'from-me'
        });
        var data = {
            "input" : {
                "text" : sendText
            }
        }
        $scope.clearSearch();
        $scope.authdata = Base64.encode("00b1cc46-9391-4f5f-8bb5-a858c7773c05" + ':' + "2XMKyjZfBlqI");
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $scope.authdata;
        var headers = {'Content-Type': 'application/json', 'Accept': 'application/json'}
        $http.post('https://watson-api-explorer.mybluemix.net/conversation/api/v1/workspaces/e7ebbad5-f3d8-41aa-9e33-d150f2a95e00/message?version=2016-09-20', data, headers).then(successCallback, errorCallback);

    }
    var successCallback = function(response){
        var textData = response.data.output.text[0];
        $scope.messages.push({
            textData : textData,
            textClass : 'from-them'
        });
    };
    var  errorCallback = function(error){
    }

    
}]);

