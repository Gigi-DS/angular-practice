blogApp.controller('alertCtrl',['$scope','$timeout','alertService',function($scope,$timeout,alertService){
    $scope.message="";
    $scope.type="success";
    init();
    
    
   
    
    function init(){
        alertService.subscribe($scope, function (){
            var m = alertService.getMessage();
            showMessage(m.text,m.type);
        });
    
    }
    
    function showMessage(m,t) {
        $scope.messageShow=true;
        $scope.message=m;
        $scope.type=t;
        $timeout(function(){
            $scope.messageShow=false;
        },3000);
    }
}]);