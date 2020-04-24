
//DB
let price = 6500;
let db = [];
for (x=5000; x<10000; x+=100) {
	db[x] = {
		sold: false,
		bought: true};
	};


//COMPARISON IF ELSE
	let comparison =
	function (_price,_db) {
		console.log('Check the price:')
		// if price is 6500 USD
		if (_price == 6500) {
			console.log(' - price is '+_price+'\n'+
			'Check memory: did it sold on this price later?')
			if (_db[6500].sold == true) {
				console.log(' - Yes. Do the order buy.')
				//buy.....
				//record to db, that it sold
				_db[6500].sold = false;
				_db[6500].bought = true;
			} else {
				console.log(' - No'+'\n'+
				'Check memory: did it bought on this price later?')
				if (_db[6500].bought == true) {
					console.log(' - Yes. Do the order sell.')
					//sell...
					//record to db, that it bought
					_db[6500].sold = true;
					_db[6500].bought = false;
				}
			}
		} else if (_price == 6600) {
			show1;
			_db[1]=5;
		} else if (_price == 6700) {
			show1;
			console.log(price)
		} else {
			console.log('error')
		}

}