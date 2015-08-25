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

 articleServices.factory("customerData",["$http",'LS','$q','$filter','$log',function($http,LS,$q,$filter,$log){
     var baseUrl = 'jsondata/articles1.json';
     var dataLoad = null; 
//     LS.clearData("cutomers");
     //schma for validation
     schema = {
                "type":"object",
                "properties":{
                    "id":{"type":"number"},
                    "name":{"type":"string"},
                    "lastname":{"type":"string"},
                    "hobby":{"type":"string"},
                    "age":{"type":"string"}
                }
            };
     
    // throw('test');
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
                  function searchArr(search){
                        var results = [];
                        for(var i=0;i<data.length;i++){
                            if(data[i].id==search || 
                               data[i].name.toLowerCase()==search.toLowerCase() || 
                               data[i].lastname.toLowerCase()==search.toLowerCase() || 
                               data[i].hobby.toLowerCase()==search.toLowerCase())
                                results.push(data[i]);
                        }
                      return results;
                    }
                    data = searchArr(search);
                        
//                    var seachName = $filter('filter')(data,{{name: search} || {lastname: search}},false);
//                   data=seachName;
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
            //ERROR
                          
                                );
        },
         getCount: function(){
            return dataLoad.then(function(data){
                return data.length;
            })
         },
         removeItem: function(removeId){
                //paramater validation
             return dataLoad.then(function(data){
                                 
                     f = data.findIndex(function(item) { return item.id == removeId; });
                     
                     if(f < 0)
                         return false;
                     data.splice(f,1);
                     
                     LS.setData(data,"cutomers");
                     
                     return true;
             });
         },
         
         
         
         addCustomer: function(newCustomer){
            return dataLoad.then(function(data){
//                 //validation
                var valid = tv4.validateMultiple(newCustomer, schema);
                if(!valid.valid){
                    return valid;
                }else{
                    data.lastId = 0;
                    id=0;
                    angular.forEach(data,function(value,key){
                        if(value.id >id) id=value.id;

                    });
                    id=id+1;
                    newCustomer.id=id;
                    data.push(newCustomer);
                    LS.setData(data,"cutomers");
                    return angular.copy(newCustomer);   // should return new customer - > id outside
                }
            });
         },
         
         getAll: function(){
            return dataLoad.then(function(data){
                return angular.copy(data);
            })
         },
         
         updateCustomer: function(customer){
            return dataLoad.then(function(data){
                //validation
                var valid = tv4.validateMultiple(customer, schema);
                if(!valid.valid){
                    return valid;
                }else{
                    arr = [];
                    angular.forEach(data,function(value, key){
                        if(value.id!=customer.id) arr.push(value);
                    })
                    arr.push(customer);
                    data=arr;
                    LS.setData(data,"cutomers");
                    dataLoad= $q.resolve(data);
                    return arr;
                }
            }).catch(onError);
         },
         
          getCustomer: function(customerId){
            return dataLoad.then(function(data){
                customer={"id":customerId};
                customer=dataLoop(data,customer);
                return angular.copy(customer);
            }).catch(onError);
         },
         
         customerPatch: function(c){
            return dataLoad.then(function(data){
                //validation
                var valid = tv4.validateMultiple(c, schema);
                if(!valid.valid){
                    return valid;
                }else{
                    cNew=dataLoop(data,c,true);
                    return cNew;
                }
            });
         }
         
        
}
     function dataLoop(data,c,patch){
        for(var i=0;i<data.length;i++){
            if(data[i].id==c.id)
                break;
        }
         if(patch){
            data[i] = angular.merge({},data[i],c);
            LS.setData(data,"cutomers");
         }
        
         return data[i];
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
            }).catch(function(e) { throw { status: e.staus, message: e.statusText }});
            dataLoad.catch(onError);
         
         return dataLoad;
         
         
         
     }
     
     function onError(error){
         $log.error();
         
        $log.error({ status: error.status, message: error.message, source: 'customerData'});
     }
     
 }]);