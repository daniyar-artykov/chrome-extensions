//$script('lib/angular-loader/angular-loader.min.js', 'angular-loader');
//$script('lib/jquery/jquery.min.js', 'jquery');
//$script('lib/angular/angular.min.js', 'angular');
var $rootScope = angular.element(document.getElementById('switchy_omega')).injector().get('$scope');
console.log($rootScope);
var currval = $rootScope.data['id'];			
document.dispatchEvent(new CustomEvent('RW759_connectExtension', {
	detail: {
		id: currval
	}
}));