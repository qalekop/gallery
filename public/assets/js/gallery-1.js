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
            var openMap = function(latitude, longitude) {
                var latLng = new google.maps.LatLng(latitude, longitude);
                var m = new google.maps.Map(element.find('div')[0], {
                    zoom: 8,
                    center: latLng,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });
                new google.maps.Marker({
                    map: m,
                    position: latLng,
                    clickable: false
                });
            };
            $http.get('/image/' + name)
                .success(function(data, status, headers, config) {
                    console.log('Latitude:' + data.latitude + '; Longitude:' + data.longitude);
                    openMap(data.latitude, data.longitude);
                })
                .error(function(data, status, headers, config) {
                    console.log('Error: ' + status);
                    show('No GPS data');
                });
        }
    }])
    .directive('galleryItem', ['getLocation', function(getLocation){
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
    }])
;
