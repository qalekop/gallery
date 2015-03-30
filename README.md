# gallery
node.js playground. By now demonstrates the following:
* obtain directory listing;
* read a binary (image in this case) file;
* extract EXIF data and parse them into a JSON structure;
* kindly ask *google* to reveresGeoCode latitute/longitude pair, retrieved from image EXIF data. An Address JSON-structure is expected;
* show image gallery (mocked as Polaroid shots) together with city names;
* image click should reveal the corresponding Google map.

By now, the following themes are covered:
- _node.js_ along with _express_;
- _exif-parser_ https://www.npmjs.com/package/exif-parser;
- _jade_ template engine http://jade-lang.com/;
- _stylus/nib_ css preprocessors http://learnboost.github.io/stylus/;
- _async_ package to handle asycnc jobs https://www.npmjs.com/package/async;
- _angular_ for in-browser level.

To-dos:
- [ ] render google map on image click;
- [ ] continue playing with _redis_;

