blogApp.controller('alertCtrl',['$scope','$timeout',function($scope,$timeout){
    
    $scope.message=true;
    $timeout(function(){
        $scope.message=false;
    },3000);
    
    
}]);