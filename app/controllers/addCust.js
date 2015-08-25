blogApp.controller("addCustCtrl",['$scope','$log','LS','$window','customerData',function($scope,$log,LS,$window,customerData){
     $scope.cust={id: 0,name: "",lastname: "",hobby: "",age: ""};
      
    
    
    $scope.addCust=function(newCust){
     customerData.addCustomer(newCust).then(function(data){
         if(data.valid===false){
            alert("Adding new customer error, please check data type");
         }else{
            $scope.cust=data;
            $window.alert("Customer Successeful added!");
         }
     });
     
    }
    
    $scope.redirect=function(){
         $window.location ="#/persons";
    }
}]);