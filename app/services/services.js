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
               // console.log(data);
                
                //todo filter sort 
               // console.log(data);
                //create search function
                var invalidEntries =0;
                
                function searchCustomer(obj){
                   // console.log(obj);
                    if('name' in obj && obj.name.toLocaleLowerCase() === search.toLowerCase()){
                        return true;
                    }else{
                        invalidEntries++;
                        return false;
                    }
                }
               // alert(invalidEntries);
//                check if isset search params
                if(search !=undefined){
//                    alert(search);
                    var arrSearch = data.filter(searchCustomer);
                    
                    console.log('Filtered Array\n', arrSearch);
                    //console.log('Number of Invalid Entries = ', invalidEntries); 
                    
                    return arrSearch; 
                }
                
                
            }
                                );
        },
         getAllData: function(){
            return dataLoad.then(function(data){
                return data;
            })
         }
}
     function init(){
         customers = LS.getData("cutomers");
         if(customers){
            dataLoad = $q.resolve(customers);
         }
             
         else
             dataLoad = $http.get(baseUrl).then(function(response){
                LS.setData(response.data,"cutomers");
                return response.data;
            });
         
         return dataLoad;
         
         
         
     }
 }]);