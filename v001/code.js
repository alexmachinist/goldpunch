var http = require('http');
var fs = require('fs');
let db = {db:[]};
		for (x=6000; x<7000; x+=1) {
			db[x] = {
				sold: false,
				bought: true};
			};
func(db);


fs.writeFile("./object.json", JSON.stringify(db), (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
});