blogApp.controller('articlesCtrl',['$scope','$window','$http','articles','LS',function($scope,$window,$http,articles,LS){
//	$window.alert("14");
//	 $scope.articles=articles.query();
//	 $http.get("jsondata/articles.json").success(function(data){
//		 console.log(JSON.stringify(data));
//		 LS.setData(data);
//		 $scope.articles=data;
//	 });
//	
	// article order
	 $scope.orderArticle='-id';
	 
	 // gettind articles
	  $scope.articles=LS.getData();
	  console.log($scope.articles);
	  
	  //pagination
//	$window.alert($scope.articles.id);
   $scope.removeArticle = function(id){
       for( i=$scope.articles.length-1; i>=0; i--) {
            if( $scope.articles[i].id == id) $scope.articles.splice(i,1);
           LS.setData($scope.articles);
       }
   }
	  
}]);
