/**
 * @author Admin
 */
blogApp.config(['$routeProvider',function($routeProvider){
	$routeProvider.
	when('/',{
		templateUrl: 'app/views/home.html',
		controller: 'homeCtrl'
	})
	.when('/articles',{
		templateUrl: "app/views/articles.html",
		controller: 'articlesCtrl'
	})
	.when('/article/:articleId',{
		templateUrl: 'app/views/article.html',
		controller: 'articleCtrl'
	}).
	when('/register',{
		templateUrl: 'app/views/register.html',
		controller: 'registerCtrl'
	})
    .when('/addarticle',{
        templateUrl: 'app/views/addarticle.html',
        controller: 'addArticleCtrl'
    })
     .when('/persons',{
        templateUrl: 'app/views/persons.html',
        controller: 'personsCtrl'
    })
	.otherwise({
		redirectTo:'app/'
	});
}]);