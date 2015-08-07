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