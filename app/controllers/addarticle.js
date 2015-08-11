blogApp.controller('addArticleCtrl',['$scope','$http','articles','LS','artID',function($scope,$http,articles,LS,artID){
//    empty new article obj
	$scope.article={
        id:"",
        img:"",
        title:"",
        short_desc:"",
        desc:""
    };
    
    
    $scope.addArticle=function(article){
//        getting all existing articles
        $scope.articles=LS.getData();
        console.log("old articles"+$scope.articles);
        
        //getting id for new article
        $scope.id=artID.setId();
        if($scope.articles.id=$scope.id){
            $scope.id=artID.setId();
        }
//      setting id and img to new article obj
        $scope.article.id=$scope.id;
        $scope.article.img="3.jpg";
//        pushing new article to the rest of article
        $scope.articles=$scope.articles.push(article);
        console.log("new articles"+$scope.articles);
        console.log($scope.article);
        
        LS.setData($scope.articles);
    }
}]);