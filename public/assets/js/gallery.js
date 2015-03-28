// gallery angular app

var galleryApp = angular.module("Gallery", []);

galleryApp.controller('GalleryController', ['$scope', 'getLocation', function($scope, getLocation) {
    $scope.imageName = function(name) {
		getLocation(name, $scope);
    };
}])
.factory('getLocation', ['$http', function($http) {
	return function(name, scope) {
	$http.get('/image/' + name)
		.success(function(data, status, headers, config) {
			console.log('Latitude:' + data.latitude + '; Longitude:' + data.longitude);
			scope.name = 'Latitude:' + data.latitude + '; Longitude:' + data.longitude;
		})
		.error(function(data, status, headers, config) {
			console.log('Error: ' + status);
			scope.name = 'No GPS data';
		});
	}
}]);
