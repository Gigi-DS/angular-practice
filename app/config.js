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
    .when('/addcustomer',{
        templateUrl: 'app/views/addcustomer.html',
        controller: "addCustCtrl"
   })
    .when('/editcustomer/:customerId',{
        templateUrl: 'app/views/editcustomer.html',
        controller: "editCustCtrl"
   })
    .when('/partialupdate/:customerId',{
        templateUrl: 'app/views/partialupdate.html',
        controller: 'partialUpdtCtrl'
    })
	.otherwise({
		redirectTo:'app/'
	});
}]);