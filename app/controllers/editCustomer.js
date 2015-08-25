blogApp.controller("editCustCtrl",['$scope','$window','$routeParams','$log','$location','customerData',function($scope,$window,$routeParams,$log,$location,customerData){
    $scope.customerId=$routeParams.customerId;
    $scope.customer = {};
    init();
    
    
    
    function init(){
        customerData.getCustomer($scope.customerId).then(function(data){
            
            //data.age= 56;
            $scope.customer=data;
            
        });
        
    }
    
    $scope.updateCustomer=function(customer){
        customerData.updateCustomer(customer).then(function(data){
                if(data.valid===false){
                    $window.alert("Error on updating cunstomer, please check type of variables");
                }else{
                    $window.alert("Customer Succesefully Updated");
                    $location.path("/persons");
                }
        });
    }
    
    //    removing data
   $scope.removeData=function(index){
       // $window.alert("remove "+index);
       if(confirm("Sure to DELETE?")){
            customerData.removeItem(index).then(function(data){
                $location.path("/persons");
            });
            
       }
   }
   
   $scope.redirect=function(toUrl,id){
       if(confirm("sure cancel editing?"))
        $location.path("/persons");
   }
   
}]);