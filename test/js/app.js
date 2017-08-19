var app= angular.module('myApp',['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/',{
		controller: 'HomeController',
		controllerAs: 'home',
		templateUrl: 'home.html'
	})
	.when('/edit',{
		controller: 'EditController',
		controllerAs: 'edit',
		templateUrl: 'edit.html'
	})
	.otherwise('/');

}])

app.constant('_',window._);

app.filter('writeQtyWithEndings', function (){
	return function (products){
		var quantity = products.length;
		var number =  quantity % 100;
		var words = ["товар", "товара", "товаров"];
		if( number >=11 && number <= 19 ) {
			return  quantity + " "+ words[2];
		} else { 
			i = quantity % 10;
			switch(i) {
				case 1: 
			  		return  quantity + " "+ words[0];
			  	break;
				case 2: 
				case 3:
				case 4:
				  	return  quantity + " "+ words[1];
				break;
			  default:
			    	return  quantity + " "+ words[2];
			}
		}
	}
});

app.factory("productList", function($http){
	var products = [];
	// var addedProducts = [];
	var oldProducts = [];

	$http.get('products.json')
			.then( function(response){
				angular.copy(response.data, products);
				// oldProducts = products;
				angular.copy(response.data, oldProducts);
			})
			.catch(function(){
				console.log("error");
			});
	return {

		getProductList: function(){
			return products;	
		},
		addProduct : function(name,price){
			products.push({"name": name,"price": price});
			// addedProducts.push({"name": name,"price": price});
		},
		resetProducts : function(){
			angular.copy(oldProducts ,products);
			return products;
		}
		
	}
});



app.controller("HomeController", function($scope,productList){
    $scope.products = productList.getProductList();
    
});

app.controller("EditController", function($scope,productList){

	$scope.products = productList.getProductList();

	$scope.addProduct = function(name,price){
		productList.addProduct(name,price);
	};

	$scope.reset = function(){
		$scope.products = productList.resetProducts();
	};
})