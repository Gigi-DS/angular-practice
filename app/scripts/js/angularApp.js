/**
 * @author Admin
 */
var blogApp = angular.module('someBlogApp',[
	'ngRoute'
]);
blogApp.config(['$routeProvider',function($routeProvider){
	$routeProvider.
	when('/app',{
		templateUrl: 'partials/home.html',
		controller: 'homeCtrl'
	})
	.when('/app/articles',{
		templateUrl: "partials/articles.html",
		controller: 'articlesCtrl'
	})
	.when('/app/article/:articleId',{
		templateUrl: 'partials/article.html',
		controller: 'articleCtrl'
	}).
	when('/app/register',{
		templateUrl: 'partials/register.html',
		controller: 'registerCtrl'
	})
	.otherwise({
		redirectTo:'/app'
	});
}]);

blogApp.controller('homeCtrl',['$scope','$http',function($scope,$http){
	$http.get("jsondata/articles.json").success(function(data){
		$scope.articles=data;
	});
}]);

blogApp.controller('articlesCtrl',['$scope','$http',function($scope,$http){
	$http.get('jsondata/articles.json').success(function(data){
		$scope.articles=data;
	});
}]);

blogApp.controller('articleCtrl',['$scope','$http','$routeParams',function($scope,$http,$routeParams){
	$http.get("jsondata/"+$routeParams.articleId+".json").success(function(data){
		$scope.article=data;
	});
}]);

blogApp.controller('registerCtrl',['$scope','$http',function($scope,$http){
	
}]);

blogApp.directive('someBlogArticles',function(){
	return{
		restrict: 'A',
		templateUrl: 'directivetmpl/articles.html'
	};
});


blogApp.directive("someBlogFullArticle",function(){
	return{
		restrict: 'E',
		templateUrl: 'directivetmpl/fullarticle.html'
	};
});