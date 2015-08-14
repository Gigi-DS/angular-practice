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

 articleServices.factory("customerData",["$http",'LS','$q','$filter',function($http,LS,$q,$filter){
     var baseUrl = 'jsondata/articles1.json';
     var dataLoad = null; 
     init();
     return{ 
//         ,sort,direction,pageIndex,pageSize            ,pageIndex,pageSize,sortKey, sortDirection
        getData: function(search,sortKey, sortReverse, pageIndex, pageSize)
        {
            return dataLoad.then(function(data) {
                
                //console.log("from getData: \n"+data);
                //total number of pagination
                pages = Math.ceil(data.length / pageSize);
                
                //if isset searc && search module
                if(search){
                  //getting data from json by name, lastName and Hobby
                    function searchData(){
                        var seachName = $filter('filter')(data, {name: search});
                        var searchLastName = $filter('filter')(data, {lastname: search});
                        var searchHobby = $filter('filter')(data, {hobby: search});
                        var searchId = $filter('filter')(data, {id: search});
                        
                        //concat all results 
                        var resultData = seachName
                            .concat(searchLastName)
                            .concat(searchHobby)
                            .concat(searchId);
                        
                        //excluding duplicated data
                        var filteredResults = resultData.filter(function (item,pos){return resultData.indexOf(item) == pos});
                        return filteredResults;
                    }
                    data = searchData();
                }
                var cout = data.length;
//                if isset sort && sortDirection && sort module
                
                if(sortKey){
                    if(!sortReverse) 
                        sortKey="-"+sortKey;
                    else 
                        sortKey="+"+sortKey;
                    
                    data = $filter('orderBy')(data,sortKey);
                }
                
                //pagination
                //begin with 
                beginWith = ((pageIndex-1) * pageSize);
                data = $filter("limitTo")(data,pageSize,beginWith);
                
              return {
                 items: data,
                count: cout
              };
                
            }
                                );
        },
         getCount: function(){
            return dataLoad.then(function(data){
                return data.length;
            })
         },
         removeItem: function(removeId){
             return dataLoad.then(function(data){
                 console.log("data-load value "+dataLoad.$$state.value);
                 if(removeId){
                     customerArr=[];
                     angular.forEach(data,function(value, key){ 
                        if(value.id!==removeId) customerArr.push(value);
                     });
                     data=customerArr;
                    console.log("after removing \n"+data);
                     
                     LS.clearData("cutomers");
                     test1=LS.getData("cutomers");
                     console.log("data after LS delete Item \n"+test1);
                     LS.setData(customerArr,"cutomers")
                     dataLoad.$$state.value=customerArr;
                     
                     test=LS.getData("cutomers");
                     console.log("data from LS after remove \n"+test);
                 }
               return data;
             
             })
            
         },
         
         
         
         addCustomer: function(newCustomer){
            return dataLoad.then(function(data){
                id=0;
                angular.forEach(data,function(value,key){
                    if(value.id >id) id=value.id;
                });
                id=id+1;
                newCustomer.id=id;
                data.push(newCustomer);
                LS.clearData("cutomers");
                LS.setData(data,"cutomers");
                dataLoad.$$state.value=data;
                return cust={id: 0,name: "",lastname: "",hobby: "",age: ""};
            })
         },
         
         getCustomer: function(customerId){
            return dataLoad.then(function(data){
                customer=[];
                
                angular.forEach(data,function(value, key){
                    if(value.id==customerId){
                        customer=value;
                    } 
                })
                return customer;
            })
         },
         
         updateCustomer: function(customer){
            return dataLoad.then(function(data){
                arr = [];
                angular.forEach(data,function(value, key){
                    if(value.id!=customer.id) arr.push(value);
                })
                arr.push(customer);
                data=arr;
                LS.clearData("cutomers");
                LS.setData(data,"cutomers");
                dataLoad.$$state.value=data;
                return true;
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