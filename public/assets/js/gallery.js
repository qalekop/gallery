// gallery angular app

var galleryApp = angular.module("Gallery", []);

galleryApp.controller('GalleryController', ['$scope', 'getLocation', function($scope, getLocation) {
    $scope.imageName = function(name) {
		$scope.name = name;
		getLocation(name);
    };
}])
.factory('getLocation', ['$http', function($http) {
	return function(name) {
	$http.get('/image/' + name)
		.success(function(data, status, headers, config) {
			console.log('Latitude:' + data.latitude + '; Longitude:' + data.longitude);
		})
		.error(function(data, status, headers, config) {
			console.log('Error: ' + status);
		});
	}
}]);
