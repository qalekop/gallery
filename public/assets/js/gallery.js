// gallery angular app

var galleryApp = angular.module("Gallery", []);

galleryApp.controller('GalleryController', ['$scope', function($scope) {
    $scope.imageName = function(name) {
		$scope.name = name;
    };
}]);
