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
blogApp.controller('articleCtrl',['$scope','$http','$routeParams','articles',function($scope,$http,$routeParams,articles){
	$scope.article = articles.get({articleId: $routeParams.articleId});
}]);
blogApp.controller('articlesCtrl',['$scope','$window','$http','articles','LS',function($scope,$window,$http,articles,LS){
//	$window.alert("14");
//	 $scope.articles=articles.query();
//	 $http.get("jsondata/articles.json").success(function(data){
//		 console.log(JSON.stringify(data));
//		 LS.setData(data,'articles-storage');
//		 $scope.articles=data;
//	 });
//	
	// article order
	 $scope.orderArticle='-id';
	 
	 // gettind articles
	  $scope.articles=LS.getData('articles-storage');
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

blogApp.controller('homeCtrl',['$scope','$http','articles',function($scope,$http,articles){
	$scope.articles=articles.query();
}]);
blogApp.controller('personsCtrl',['$scope','$routeParams','$window','customerData','$log',function($scope,$routeParams,$window,customerData,$log){
    //setting empty array for data
	$scope.persons=[];
    
    $scope.searchParams=function(key){
        $scope.persons= customerData.getData(key);
        $log.log($scope.persons);
    }
    
//   console.log($scope.persons);
    
//     $scope.persons=customerData.getData($scope.search);

    
    
    
    //sort by function
    $scope.sort=function(keyName){
        $scope.sortKey=keyName;
        $scope.reverse = !$scope.reverse;
    }
}]);
blogApp.controller('registerCtrl',['$scope','$http',function($scope,$http){
	$scope.user={};
}]);
/**
 * @author Admin
 */
blogApp.directive('someBlogArticles',function(){
	return{
		restrict: 'A',
		templateUrl: 'app/views/directivetmpl/articles.html'
	};
})


.directive("someBlogFullArticle",function(){
	return{
		restrict: 'E',
		templateUrl: 'app/views/directivetmpl/fullarticle.html'
	};
})


.directive('emailRequiredValid',function(){
	return{
		link: function(scope, element, attrs){
			element.on("blur",function(){
				if(scope.regform.email.$error.required){
					alert("field is required");
				}
				if(scope.regform.email.$invalid && !scope.regform.email.$error.required){
					alert("invalid email");
				}
			});
		}
		
	};
})

.directive('nameRequired',function(){
	return{
		link: function(scope, element, attrs){
			element.on("blur",function(){
				if(scope.regform.name.$error.required){
					alert("field is required");
				}
				if(scope.regform.$error.minlength){
					alert('You must enter min. 3 characters');
				}
			});
		}
		
	};
})

.directive('passRequired',function(){
	return{
		restrict: 'A',
		link: function(scope,element,attrs){
			element.on('blur',function(){
				if(scope.regform.password.$error.required){
					alert("this field is required");
				}
				if(scope.regform.password.$error.minlength){
					alert('You must enter min. 6 characters');
				}
			});
		}
	};
})

.directive('pwCheck', [function () {
    return {
      require: 'ngModel',
      link: function (scope, elem, attrs) {
        var firstPassword = '#' + attrs.pwCheck;
        elem.on('blur', function(){
        	if(elem.val()!==$(firstPassword).val()){
        		alert("Passwords doesn`t match!");
        	}
        });
        
      }
    };
  }]);
var articleServices = angular.module('someBlogServices', ['ngResource']);

articleServices.factory('articles', ['$resource',
  function($resource){
    return $resource('jsondata/:articleId.json', {}, {
      query: {method:'GET', params:{articleId:'articles'}, isArray:true}
    });
  }]);
  
 articleServices.factory("LS",['$window',function($window){
 	init();
     
     return{
 		setData: function(val,name){
            
 			$window.localStorage.setItem(name,JSON.stringify(val));
 		},
 		getData: function(name){
 			 return JSON.parse($window.localStorage.getItem(name));
 			
 		},
        clearData: function(name){
            $window.localStorage.removeItem(name);
        }
 	};
     
     function init() {
        if(!$window.localStorage)
                throw new Error('local Storage is not set');
     }
 }]);

 articleServices.factory("artID",['$window',function($window){
    return{
        setId: function(){
            return Math.floor((Math.random()*6000)+1);
        }
    }
    
 }]);

 articleServices.factory("customerData",["$http",'LS','$q',function($http,LS,$q){
     var baseUrl = 'jsondata/articles1.json';
     var dataLoad = null; 
     init();
     return{ 
//         ,sort,direction,pageIndex,pageSize
        getData: function(search)
        {
            return dataLoad.then(function(data) {
                //todo filter sort 
               // console.log(data);
                //create search function
                var invalidEntries =0;
                
                function searchCustomer(obj){
                    console.log(obj);
                    if('name' in obj && obj.name == search){
                        return true;
                    }else{
                        invalidEntries++;
                        return false;
                    }
                }
                
//                check if isset search params
                if(search !=undefined){
//                    alert(search);
                    var arrSearch = data.filter(searchCustomer);
                    console.log('Filtered Array\n', arrSearch);
//                    console.log('Number of Invalid Entries = ', invalidEntries); 
                    return arrSearch; 
                }
                
                
            });
        }
}
     function init(){
         customers = LS.getData("cutomers");
         if(customers)
            dataLoad = $q.resolve(customers);
             
         else
             dataLoad = $http.get(baseUrl).then(function(response){
                LS.setData(response.data,"cutomers");
                return response.data;
            });
         
         return dataLoad;
         
         
         
     }
 }]);
//# sourceMappingURL=appScripts.js.map
var blogApp=angular.module("someBlogApp",["ngRoute","someBlogServices","angularUtils.directives.dirPagination"]);blogApp.controller("testCtrl",["$scope","$http",function(e,r){e.main={Name:"Gigi",Address:"Unknown"}}]),blogApp.config(["$routeProvider",function(e){e.when("/",{templateUrl:"app/views/home.html",controller:"homeCtrl"}).when("/articles",{templateUrl:"app/views/articles.html",controller:"articlesCtrl"}).when("/article/:articleId",{templateUrl:"app/views/article.html",controller:"articleCtrl"}).when("/register",{templateUrl:"app/views/register.html",controller:"registerCtrl"}).when("/addarticle",{templateUrl:"app/views/addarticle.html",controller:"addArticleCtrl"}).when("/persons",{templateUrl:"app/views/persons.html",controller:"personsCtrl"}).otherwise({redirectTo:"app/"})}]),blogApp.directive("someBlogArticles",function(){return{restrict:"A",templateUrl:"app/views/directivetmpl/articles.html"}}).directive("someBlogFullArticle",function(){return{restrict:"E",templateUrl:"app/views/directivetmpl/fullarticle.html"}}).directive("emailRequiredValid",function(){return{link:function(e,r,t){r.on("blur",function(){e.regform.email.$error.required&&alert("field is required"),e.regform.email.$invalid&&!e.regform.email.$error.required&&alert("invalid email")})}}}).directive("nameRequired",function(){return{link:function(e,r,t){r.on("blur",function(){e.regform.name.$error.required&&alert("field is required"),e.regform.$error.minlength&&alert("You must enter min. 3 characters")})}}}).directive("passRequired",function(){return{restrict:"A",link:function(e,r,t){r.on("blur",function(){e.regform.password.$error.required&&alert("this field is required"),e.regform.password.$error.minlength&&alert("You must enter min. 6 characters")})}}}).directive("pwCheck",[function(){return{require:"ngModel",link:function(e,r,t){var i="#"+t.pwCheck;r.on("blur",function(){r.val()!==$(i).val()&&alert("Passwords doesn`t match!")})}}}]);var articleServices=angular.module("someBlogServices",["ngResource"]);articleServices.factory("articles",["$resource",function(e){return e("jsondata/:articleId.json",{},{query:{method:"GET",params:{articleId:"articles"},isArray:!0}})}]),articleServices.factory("LS",["$window",function(e){function r(){if(!e.localStorage)throw new Error("local Storage is not set")}return r(),{setData:function(r,t){e.localStorage.setItem(t,JSON.stringify(r))},getData:function(r){return JSON.parse(e.localStorage.getItem(r))},clearData:function(r){e.localStorage.removeItem(r)}}}]),articleServices.factory("artID",["$window",function(e){return{setId:function(){return Math.floor(6e3*Math.random()+1)}}}]),articleServices.factory("customerData",["$http","LS","$q",function(e,r,t){function i(){return customers=r.getData("cutomers"),o=customers?t.resolve(customers):e.get(l).then(function(e){return r.setData(e.data,"cutomers"),e.data})}var l="jsondata/articles1.json",o=null;return i(),{getData:function(e){return o.then(function(r){function t(r){return console.log(r),"name"in r&&r.name==e?!0:(i++,!1)}var i=0;if(void 0!=e){var l=r.filter(t);return console.log("Filtered Array\n",l),l}})}}}]),blogApp.controller("addArticleCtrl",["$scope","$http","articles","LS","artID",function(e,r,t,i,l){e.article={id:"",img:"",title:"",short_desc:"",desc:""},e.addArticle=function(r){e.articles=i.getData(),console.log("old articles"+e.articles),e.id=l.setId(),(e.articles.id=e.id)&&(e.id=l.setId()),e.article.id=e.id,e.article.img="3.jpg",e.articles=e.articles.push(r),console.log("new articles"+e.articles),console.log(e.article),i.setData(e.articles)}}]),blogApp.controller("articleCtrl",["$scope","$http","$routeParams","articles",function(e,r,t,i){e.article=i.get({articleId:t.articleId})}]),blogApp.controller("articlesCtrl",["$scope","$window","$http","articles","LS",function(e,r,t,l,o){e.orderArticle="-id",e.articles=o.getData("articles-storage"),console.log(e.articles),e.removeArticle=function(r){for(i=e.articles.length-1;i>=0;i--)e.articles[i].id==r&&e.articles.splice(i,1),o.setData(e.articles)}}]),blogApp.controller("homeCtrl",["$scope","$http","articles",function(e,r,t){e.articles=t.query()}]),blogApp.controller("personsCtrl",["$scope","$routeParams","$window","customerData","$log",function(e,r,t,i,l){e.persons=[],e.searchParams=function(r){e.persons=i.getData(r),l.log(e.persons)},e.sort=function(r){e.sortKey=r,e.reverse=!e.reverse}}]),blogApp.controller("registerCtrl",["$scope","$http",function(e,r){e.user={}}]);
//# sourceMappingURL=appScripts.min.js.map
/**
 * @author Admin
 */
