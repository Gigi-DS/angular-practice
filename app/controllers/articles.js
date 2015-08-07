blogApp.controller('articlesCtrl',['$scope','$http','articles',function($scope,$http,articles){
	$scope.articles=articles.query();
}]);