blogApp.controller('articleCtrl',['$scope','$http','$routeParams','articles',function($scope,$http,$routeParams,articles){
	$scope.article = articles.get({articleId: $routeParams.articleId});
}]);