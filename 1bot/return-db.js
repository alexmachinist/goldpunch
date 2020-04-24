var http = require('http');
var fs = require('fs');
let db = {};





fs.readFile('./object.json', function (err, data) {
  if (err) throw err;
  //console.log(JSON.parse(data))
  db = JSON.parse(data);
  
  let a = 6485;

//  console.log(db[a-50])
//  console.log(db[a])
//  console.log(db[a+50])

console.log(db)
});






