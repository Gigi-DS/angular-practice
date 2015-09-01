blogApp.controller("addCustCtrl",['$scope','$log','LS','$window','customerData','alertService',function($scope,$log,LS,$window,customerData,alertService){
     $scope.cust={id: 0,name: "",lastname: "",hobby: "",age: ""};
      
    
    
    $scope.addCust=function(newCust){
     customerData.addCustomer(newCust).then(function(data){
            $scope.cust=data;
            $window.location ="#/persons";
            alertService.display("Customer successefuly added!","success");
     },
    function(error){
        alertService.display(error.message,"danger");
     });
     
    }
    
    $scope.redirect=function(){
         $window.location ="#/persons";
    }
}]);