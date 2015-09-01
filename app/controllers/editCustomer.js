blogApp.controller("editCustCtrl",['$scope','$window','$routeParams','$log','$location','customerData','alertService',function($scope,$window,$routeParams,$log,$location,customerData,alertService){
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
            $location.path("/persons");
            alertService.display("Customer successefuly updated!","success");
        },
        function(error){
            alertService.display(error.message,"danger");
        });
    }
    
    //    removing data
   $scope.removeData=function(index){
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