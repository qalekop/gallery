angular
    .module("Gallery", [])
    .controller('GalleryController', ['$scope', function($scope){
        $scope.message = $scope.latitude = $scope.longitude = '';
    }])
    .factory('getLocation', ['$http', function($http) {
        return function(name, scope, element) {
            var show = function(text) {
              element.find('div').text(text);
            };
            $http.get('/image/' + name)
                .success(function(data, status, headers, config) {
                    console.log('Latitude:' + data.latitude + '; Longitude:' + data.longitude);
                    show(data.latitude + '/' + data.longitude);
                })
                .error(function(data, status, headers, config) {
                    console.log('Error: ' + status);
                    show('No GPS data');
                });
        }
    }])
    .directive('galleryItem', function(getLocation){
        var isMapVisible = false;
        return {
            restrict: 'A'
             , link: function(scope, element, attr) {
                var name = attr.galleryItem;
                console.log('link  for ' + name);
                element.on('click', function() {
                    console.log('Clicked: ' + name);
                    element.find('img').toggleClass('ng-hide');
                    element.find('div').toggleClass('ng-hide');
                    if (isMapVisible = !isMapVisible) getLocation(name, scope, element);
                });
            }
        }
    })
;
