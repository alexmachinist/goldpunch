var http = require('http');
var fs = require('fs');
let db = {};





fs.readFile('./object.json', function (err, data) {
  if (err) throw err;
  //console.log(JSON.parse(data))
  db = JSON.parse(data);
  
  let a = 6355;

  console.log(db.db[a-50])
  console.log(db.db[a])
  console.log(db.db[a+50])

});






