var fs = require('fs');

let db= {};
try {
    db = fs.readFileSync('object.json', 'utf-8')
} catch (ex) {
    console.log(ex)
}

let db2 = {};
db2 = JSON.parse(db);
console.log(typeof db2);
