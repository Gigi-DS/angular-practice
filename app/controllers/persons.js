blogApp.controller('personsCtrl',['$scope','$routeParams','$window','customerData','$log',function($scope,$routeParams,$window,customerData,$log){
   
    //setting empty array for records
	$scope.persons=[];
    $scope.search = "";
    $scope.sortKey = "id";
    $scope.sortReverse = true;
    $scope.pageIndex = 1;
    $scope.pageSize = 5;
    $scope.totalPages = 0;
    $scope.removeId=false;
    $scope.refresh=refresh;
    
  init();
    
    
    
    function init(){
        refresh();
    }
    function refresh(){
        customerData.getData($scope.search,$scope.sortKey,$scope.sortReverse,$scope.pageIndex, $scope.pageSize).then(function(data){
           $scope.persons = data.items;
            $scope.totalPages = Math.ceil(data.count / $scope.pageSize);
            $scope.totalPages = numToArr($scope.totalPages);
        });
    }
      
    //sort
    $scope.sort=function(keyName){
        if($scope.sortKey!=keyName){
            $scope.sortKey = keyName;
            $scope.sortReverse = false;
        }else{
             $scope.sortReverse = !$scope.sortReverse;
        }
        refresh();
    }
    
    //pagination
    $scope.setPage=function(index){
        $scope.pageIndex = index;
        refresh();
    }
   
//    removing data
   $scope.removeData=function(index){
       // $window.alert("remove "+index);
       if(confirm("Sure to DELETE?")){
            customerData.removeItem(index);
            refresh();
       }
   }
    
    //from number to array
     function numToArr(n){
        var arr = [];
        for(i =1; i <= n; i++){
            arr.push(i);
        }
         return arr;
    }
}]); 