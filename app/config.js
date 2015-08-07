/**
 * @author Admin
 */
blogApp.config(['$routeProvider',function($routeProvider){
	$routeProvider.
	when('/app',{
		templateUrl: 'app/views/home.html',
		controller: 'homeCtrl'
	})
	.when('/app/articles',{
		templateUrl: "app/views/articles.html",
		controller: 'articlesCtrl'
	})
	.when('/app/article/:articleId',{
		templateUrl: 'app/views/article.html',
		controller: 'articleCtrl'
	}).
	when('/app/register',{
		templateUrl: 'app/views/register.html',
		controller: 'registerCtrl'
	})
	.otherwise({
		redirectTo:'app/'
	});
}]);