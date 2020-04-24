var http = require('http');
var fs = require('fs');
let db = {db:[]};
let func = function(db) {
	for (x=0; x<10; x+=1) {
			db.db[x] = {
				sold: false,
				bought: true};
			};
			
		}
func(db);


fs.writeFile("./object.json", JSON.stringify(db), (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
});