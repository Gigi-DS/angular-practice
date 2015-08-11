var articleServices = angular.module('someBlogServices', ['ngResource']);

articleServices.factory('articles', ['$resource',
  function($resource){
    return $resource('jsondata/:articleId.json', {}, {
      query: {method:'GET', params:{articleId:'articles'}, isArray:true}
    });
  }]);
  
 articleServices.factory("LS",['$window',function($window){
 	return{
 		setData: function(val){
 			$window.localStorage.removeItem("article-storage");
 			$window.localStorage && $window.localStorage.setItem("article-storage",JSON.stringify(val));
 			return this;
 		},
 		getData: function(){
 			 return JSON.parse($window.localStorage && $window.localStorage.getItem('article-storage'));
 			
 		}
 	};
 }]);

 articleServices.factory("artID",['$window',function($window){
    return{
        setId: function(){
            return Math.floor((Math.random()*6000)+1);
        }
    }
    
 }]);