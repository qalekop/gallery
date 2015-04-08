angular
    .module("Gallery", [])
    .controller('GalleryController', ['$scope', function($scope){
        $scope.showImage = '*';
    }])
    .directive('galleryItem', function(){
        return {
            restrict: 'A'
             , link: function(scope, element, attr) {
                var name = attr.galleryItem;
                console.log('link  for ' + name);
                element.on('click', function() {
                    console.log('Clicked: ' + name);
                    element.find('figure').toggleClass('ng-hide');
                    element.find('div').toggleClass('ng-hide');
                });
            }
        }
    })
;
