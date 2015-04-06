angular
    .module("Gallery", [])
    .directive('galleryItem', function(){
        var showImage = true;
        return {
            restrict: 'A'
            , scope: {showImage: '@'}
             , link: function(scope, element, attr) {
                console.log('link  for ' + attr.galleryItem);
                element.on('click', function() {
                    showImage = !showImage;
                    scope.showImage = attr.galleryItem;
                    console.log('Clicked: ' + scope.showImage);
                });
                //$scope.showImage = '';
            }
        }
});