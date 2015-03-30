# gallery
node.js playground. By now demonstrates the following:
* obtain directory listing;
* read a binary (image in this case) file;
* extract EXIF data and parse them into a JSON structure;
* kindly ask *google* to reveresGeoCode latitute/longitude pair, retrieved from image EXIF data. An Address JSON-structure is expected;
* show image gallery (mocked as Polaroid shots) together with city names;
* image click should reveal the corresponding Google map.

# Technologies used
By now, the following:
- _node.js_ along with _express_;
- _exif-parser_;
- _jade_ template engine;
- _stylus/nib_ css preprocessors;
- _async_ package to handle asycnc jobs;
- _angular_ for in-browser level.

#To-dos
[x] render google map on image click;
[x] continue playing with _redis_;

