var request = require("request");
var fs = require('fs');

var TOILETS_URL = "http://59.41.9.79:8399/arcgis/rest/services/gzCGW_wgs9_20121030/MapServer/0/query?f=json&spatialRel=esriSpatialRelIntersects&where=%20&outSR=4326&returnGeometry=true&outFields=ROADNAME%2COBJPOS%2CDISTRICT"

request(TOILETS_URL, function(err, response, body) {
  if (!err && response.statusCode == 200) {
    try {
      var data = JSON.parse(body);
      //console.log(data.displayFieldName);
      //console.log(data.fieldAliases);
      //console.log(data.geometryType);
      //console.log(data.specialReference);
      //console.log(data.features.length);
      //console.log(Object.keys(data));
      fs.writeFile('toilets.json', JSON.stringify(data.features), function(error) {
        if (error) throw error;
        console.log('data written into file!');
      });
    } catch (e) {
      console.log('parse fucked up');
    }
  } else {
    console.log('oh fuck');
  }
});
