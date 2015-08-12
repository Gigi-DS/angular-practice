blogApp.controller('personsCtrl',['$scope','$routeParams','$window','customerData','$log','LS',function($scope,$routeParams,$window,customerData,$log,LS){
   
    //setting empty array for records
	$scope.persons=[];
    
    //on load getting all records
    customerData.getAllData().then(function(data){
        $scope.persons = data;
    });
    
//    search
    $scope.searchParams=function(search){
        customerData.getData(search).then(function(data) {
            $scope.persons = data;
        });
    }
    
    
//    show all customers
    $scope.showAllCustomers=function(){
         customerData.getAllData().then(function(data){
             $scope.persons = data;
             $scope.search = "";
             $scope.customerFilter = "";
        });
    }
    
    //sort
    $scope.sort=function(keyName){
        $scope.sortKey=keyName;
        $scope.reverse = !$scope.reverse;
    }
}]); 