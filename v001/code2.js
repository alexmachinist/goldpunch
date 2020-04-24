var http = require('http');
var fs = require('fs');
let db = {};





fs.readFile('./object.json', function (err, data) {
  if (err) throw err;
  //console.log(JSON.parse(data))
  db = JSON.parse(data);
  fs.writeFile("./object2.json", JSON.stringify(db), (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
});
});





fs.writeFile("./object2.json", JSON.stringify(db), (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
});
