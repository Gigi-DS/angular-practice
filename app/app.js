/**
 * @author Admin
 */
var blogApp = angular.module('someBlogApp',[
	'ngRoute',
	'someBlogServices',
	'angularUtils.directives.dirPagination'
]);

blogApp.controller('testCtrl',['$scope','$http', function($scope,$http){
    $scope.main={
        Name: 'Gigi',
        Address: 'Unknown' 
    }; 
}]);