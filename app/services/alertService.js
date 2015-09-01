var alertServices = angular.module('alertServices', []);

alertServices.factory('alertService', ['$rootScope',
    
  function($rootScope){
      var message = "";
      var type = "success";
    return {
        display: function(m,t) {
            message=m;
            type=t;
            $rootScope.$emit("alert-message-event");
        
        },
        subscribe: function(scope,callback){
            var handler = $rootScope.$on('alert-message-event',callback);
        },
        getMessage: function(){
            return {
                "text":message,
                "type":type
            }
            
        }
    };
  }]);