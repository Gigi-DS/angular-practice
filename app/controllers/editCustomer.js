blogApp.controller("editCustCtrl",['$scope','$window','$routeParams','$log','$location','customerData',function($scope,$window,$routeParams,$log,$location,customerData){
    $scope.customerId=$routeParams.customerId;
    $scope.customer = {};
    init();
    
    
    
    
    function init(){
        customerData.getCustomer($scope.customerId).then(function(data){
            $scope.customer=data;
        });
        
    }
    
    $scope.updateCustomer=function(customer){
        customerData.updateCustomer(customer).then(function(data){
            if(data) {
                $window.alert("Customer Succesefully Updated");
                $location.path("/persons");
            }
        });
    }
}]);