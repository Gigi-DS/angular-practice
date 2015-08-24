////testing merge
//var gigi = {"id":1,"name":"Gigi", "lastname":"DS", "hobby":"football", "age":"1987/06/04"};
//var gigel = {"id":1,"name":"Gigel", "lastname":"DS-MD", "hobby":"football", "age":"1987/06/04"};
//
////var gigle = {
////    id:1,
////    fname:"gigel",
////    lname:"DS-Moldova",
////    hobby:"football",
////    age:"1987/06/04
////};
//
//console.log(angular.merge({},gigi,gigel));
//
////practice with functiuonal programming
//function test1() {
//    var i = 4;
//   // alert("first: "+i);
//    f = function () {
//        i = i + 1;
//       // alert("second: "+i);
//        return i;
//    }
//    return {
//        exec: f
//    };
//}
//
//
//var fac = test1;
//
//f1 = fac();
//f2 = fac();
//f3 = fac();
//
//
//console.log('f1.1:' + f1.exec());
//console.log('f2.1:' + f2.exec());
//console.log('f3.3:' + f3.exec());
//console.log('f1.2:' + f1.exec());
//console.log('f1.3:' + f1.exec());
//console.log('f3.2:' + f3.exec());
//console.log('f2.2:' + f2.exec());
//
//
//var say = function(name, message){
//    console.log(name+" say "+message);
//}
//
//say("Gigi", "morning");
//
//say("Gigi","morning","third param no to display");
//
//say("gigi");
//
//
//sayV2=function(name, message){
//    console.log(name+" say "+(message || "nothing at all"));
//}
//
//sayV2("gigi");
//
////always return something
//sayfunctional=function(name, message){
//    return name+" say "+(message || 'nothing at all yo');
//}
//
//console.log(sayfunctional("Gigi"));
//
////finish practice with functional programming

blogApp.controller('personsCtrl',['$scope','$routeParams','$window','customerData','$log','$location','$filter','$http',function($scope,$routeParams,$window,customerData,$log,$location,$filter,$http){
   
    //setting empty array for records
	$scope.persons=[];
    $scope.search = "";
    $scope.sortKey = "id";
    $scope.reverse = true;
    $scope.pageIndex = 1;
    $scope.pageSize = 5;
    $scope.maxPageRightLeft=2;
    $scope.totalPages = 0;
    $scope.removeId=false;
    $scope.refresh=refresh;
    $scope.quickEdit=false;
    
  init();
    
    
    
    function init(){
        refresh();
    }
    
    $scope.reloadPage=function(){
        $window.location.reload();
    }
    
    function refresh(){
        customerData.getData($scope.search,$scope.sortKey,$scope.reverse,$scope.pageIndex, $scope.pageSize).then(function(data){
            //console.log(data.status);
            
           //for loop persons convertModelToVM function
            items = data.items;
            for(i=0;i<items.length ; i++)
                items[i] = convertModelToVM(items[i]);
            
            
            $scope.persons = data.items;
            $scope.totalPages = Math.ceil(data.count / $scope.pageSize);
            $scope.totalPagesArr = numToArr($scope.totalPages);
        }).catch(function(e){
            $window.alert(e.message);
        });
    }
      function convertModelToVM(model){
          var arr={};
          var birthday = new Date(model.age);
          arr.birthday = angular.copy(model.age);
          
         var today = new Date($filter('date')(new Date,'yyyy/MM/dd'));
          $log.log
          var age = today - birthday;
          
          var minutes = 1000*60;
          var hours = minutes*60;
          var days = hours*24;
          var years = days*365;
          
          arr.birthday = Math.round(age/years);
          
          
        return angular.merge({},model,arr);
      }
    
    //sort
    $scope.sort=function(keyName){
        if($scope.sortKey!=keyName){
            $scope.sortKey = keyName;
            $scope.reverse = false;
        }else{
             $scope.reverse = !$scope.reverse;
        }
        refresh();
    }
    
    //pagination
    $scope.setPage=function(index){
        $scope.pageIndex = index;
        refresh();
    }
   
    //show customer
    $scope.showCustomer=function(id){
        $scope.quickEdit = true;
        var customer = {};
        for(var i=0; i<$scope.persons.length;i++){
            if($scope.persons[i].id==id){
                customer=angular.copy($scope.persons[i]);
                break;
            }
        }
        return $scope.customer=customer;
    }
    
    $scope.quickSave=function(c){
        console.log(c);
        customerData.quickUpdate(c);
        $scope.close;
        refresh();
    }
    
     $scope.close = function(){
       $scope.customer={};
        $scope.quickEdit = false;
   }
    
   $scope.redirect=function(toUrl,personId){
       $window.location =toUrl+personId;
   }
   
   
   //x page left and rigth to the current page
  function xPagesLeftRight(Arr){
      //checking if not empty maxPageRightLeft
      if($scope.maxPageRightLeft == null) $scope.maxPageRightLeft = 2;
       var arr=[];
      //setting left pages
        for(i=1;i<=$scope.maxPageRightLeft;i++){
            var left = $scope.pageIndex - i;
            var right = $scope.pageIndex + i;
            if(left>0){
                arr.push(left);
            }
            if(right<=$scope.totalPages)
            arr.push(right);
        }
      
      //setting current page
      arr.push($scope.pageIndex);
      return arr.sort();
   }
   
   
    //from number to array
     function numToArr(n){
        var arr = [];
        for(i =1; i <= n; i++){
            
            arr.push(i);
        }
         xPagesLeftRight(arr);
         return xPagesLeftRight(arr);
    }
    $log.error();
    

}]); 