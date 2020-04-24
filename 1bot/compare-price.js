let price = 6500;
let db = [];
for (x=5000; x<10000; x+=100) {
	db[x] = {
		sold: false,
		bought: true};
	};
const menu = require('./menu.js')

Order()

let comparison = function (_price,_db) {
console.log('Check the price:')
// if price is 6g500 USD
for (cp=5000; cp<10001; cp+=200) {
switch (_price) {	
case cp:
	console.log(' - price is '+_price+'\n'+
	'Check memory: did it sold on this price later?')
	switch (_db[cp].sold) { 							//start comp. 'sold'
	case true:
		console.log(' - Yes. Do the order buy.')
		//buy.....
		//record to db, that it sold
		_db[cp].sold = false;
		_db[cp].bought = true;
		break;
	case false:
		console.log(' - No'+'\n'+
		'Check memory: did it bought on this price later?')
		switch (_db[cp].bought) {							//start comp. 'bought' (in sold)
		case true: 											
			console.log(' - Yes. Do the order sell.')
			//sell...
			order();
			console.log('_______Order created')
			//record to db, that it bought
			_db[cp].sold = true;
			_db[cp].bought = false;
			break;
		}													//end comp. 'bought' (in sold)
		break; //break sold compare						
	break; //break case cp of compare
	}
default:
	console.log('Ne sovpadaet');
}
}}

//comparison(price,db)
