
blogApp.controller('partialUpdtCtrl',['$scope','$window','$routeParams','$location','customerData','alertService',function($scope, $window, $routeParams, $location, customerData,alertService){
    $scope.id=$routeParams.customerId;
    $scope.customer = {};
    $scope.customer.age="";
    $scope.today = new Date();
    init();
    
    function init(){
        getCustomer($scope.id);
    }
    
    function getCustomer(id){
        customerData.getCustomer(id).then(function(data){
            $scope.customer = data;
            $scope.customer.age = new Date(data.age);
        });
    }
    
    $scope.redirect=function(toUrl,personId){
       $window.location =toUrl+personId;
   }
    
    $scope.quickSave=function(c){
        customerData.customerPatch(c).then(function(data){
            //console.log(data);
                $scope.quickEdit = false;
                $scope.customer={};
                $location.path("/persons");
                alertService.display("Edited successfully updated!","success");
                $scope.updatecustomer.$setUntouched();
            
            
        }, function(error){
            alertService.display(error.message,"danger");
        });
    }
}]);