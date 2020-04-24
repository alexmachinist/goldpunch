const url = 'https://api.bitfinex.com/v1'
const request = require('request')

let comparePrice = function(price) {
	if (price > 6475) {
		console.log('bolshe 6475')
	} else {
		console.log('menshe 6475')}
	}

let lastPrice;

let checkPrice = function() {
	request.get(url + '/pubticker/btcusd',
	function(error, response, body) {
			lastPrice = Number(JSON.parse(body).last_price);
   			roundedLastPrice = Math.round(lastPrice);
   			console.log(lastPrice+' > '+roundedLastPrice);   			
			comparePrice(lastPrice);
			//console.log(body);
		});
}

var timerId = setInterval(function() {
	checkPrice();
}, 3000);


