var express = require('express')
  , fs = require('fs')
  , parser = require('exif-parser')
  , gm = require('googlemaps')
  , async = require('async')
  , stylus = require('stylus')
  , nib = require('nib')
  , redis = require('redis').createClient()
  ;

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
    , width
    , height;

files.forEach(function(file, i) {
  exif = parser.create(fs.readFileSync(fnPrefix + '/' + file)).parse();
  height = exif.imageSize.height;
  width = exif.imageSize.width;
  var image = {'name': file, 'endroit': 'Quelque part', 'width': width, 'height': height};
  images[i] = image;
  if (exif.tags.GPSVersionID) {
    image.waitForName = true;
    image.latitude = exif.tags.GPSLatitude; image.longitude = exif.tags.GPSLongitude;
  }
});

async.each(images
  , function(item, callback) {
    if (item.waitForName) {
      gm.reverseGeocode(item.latitude + ',' + item.longitude, function(err, data) {
        item.endroit = data.results[2].formatted_address;
        redis.hmset(item.name, {
          latitude: item.latitude
          , longitude: item.longitude}, function() {callback();}
        );
      });
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

app.get('/image/:id', function(req, res) {
  var id = req.params.id;
  console.log('*** request for ' + id);
  redis.exists(id, function(err, reply) {
    if (reply == 1) {
      async.parallel({
        latitude: function(callback) {
          redis.hexists(id, 'latitude', function(err, reply) {
            if (reply == 1) {
              redis.hget(id, 'latitude', function (err, obj) {
                callback(err, obj);
              });
            } else {
              callback('Not found', null);
            }
          });
        }
        , longitude: function(callback) {
          redis.hexists(id, 'longitude', function(err, reply) {
            if (reply == 1) {
              redis.hget(id, 'longitude', function (err, obj) {
                callback(err, obj);
              });
            } else {
              callback('Not found', null);
            }
          });
         }
      }, function(err, result){
        if (!err && result.latitude && result.longitude) {
          console.log('Found: ' + result.latitude + '/' + result.longitude);
          res.json({latitude: result.latitude, longitude: result.longitude});
        } else {
          console.log('Not found');
          res.status(404).json({error: 'Not found'});
        }
      });
    } else {
      console.log('Not found');
      res.status(404).json({error: 'Not found'});
    }
  });
});
