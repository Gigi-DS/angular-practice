blogApp.controller('homeCtrl',['$scope','$http','articles',function($scope,$http,articles){
	$scope.articles=articles.query();
}]);