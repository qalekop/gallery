var express = require('express')
  , fs = require('fs')
  , parser = require('exif-parser')
  , gm = require('googlemaps')
  , async = require('async')
  , stylus = require('stylus')
  , nib = require('nib');

var app = express();
function compile(str, path) {
  return stylus(str).set('filename', path).use(nib());
};

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(stylus.middleware(
  { src: __dirname + '/public/'
    , compile: compile
  }
));
app.use(express.static(__dirname + '/public'));

/////////////////////////////
var images = [];
var fnPrefix = __dirname + '/public/assets/gallery';
var files = fs.readdirSync(fnPrefix);
var file
    , exif
    , coords
    , width
    , height;

for (var i=0; i<files.length; i++) {
  file = files[i]
  exif = parser.create(fs.readFileSync(fnPrefix + '/' + file)).parse();
  height = exif.imageSize.height;
  width = exif.imageSize.width;
  var image = {'name': file, 'endroit': 'Quelque part', 'width': width, 'height': height};
  images[i] = image;
  if (exif.tags.GPSVersionID) {
	  image.waitForName = true;
	  image.latitude = exif.tags.GPSLatitude; image.longitude = exif.tags.GPSLongitude;
  }
}

async.each(images
		, function(item, callback) {
			if (item.waitForName) {
				gm.reverseGeocode(item.latitude + ',' + item.longitude, function(err, data){item.endroit = data.results[2].formatted_address; callback()});
			} else {
				callback();
			}
		}
		, function(err) {
			console.log('over');
			app.listen(3000, function() {console.log('listening...');});
		}
);
/////////////////////////////
app.get('/', function (req, res) {
  res.render('index', { title: 'Gallery', images: images });
});
