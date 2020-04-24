/*
08.11

start of program 8.11.2018 21:50

params:
refresh price 20 sec
order funcs is on
amount 0.003

changes:
fixed argument cp in orders
added errors responses
buy sell comparisons changed by places (pomeneni mestami)
proverene db
added tabs in console.logs

*/


const url = 'https://api.bitfinex.com/v1'
const request = require('request')
const crypto = require('crypto')
var fs = require('fs');
let lastPrice;
  //let cp= 6850;
let divider = 50;
let db0 = {};
let db = {};
///*
try {
    db0 = fs.readFileSync('objectLoad.json', 'utf-8')
} catch (ex) {
    console.log(ex)
}
db = JSON.parse(db0);
// */

/*
		for (x=6000; x<7001; x+=50) {
			db[x] = {
				//"price": x,
				"sold": false,
				"bought": true};
			};
      */


const apiKey = 'IGHXb4Psfq6h6BCfZWIK70UxlqFycuUeADyVq4Y9bmC'
const apiSecret = 'jbkonhtR3qVQ8xe9aN8Z7QCaFFqYT1AhRFZuBvy925A'
const baseUrl = 'https://api.bitfinex.com'

let newOrderSell = function(tryPrice) {
  let url = "/v1/order/new"
  const nonce = Date.now().toString()
  const completeURL = baseUrl + url
  let body = {
     request: url,
     nonce: Date.now().toString(),
     symbol: 'BTCUSD',
     amount: '0.003',
     price: String(tryPrice),
     exchange: 'bitfinex',
     side: 'sell',
     type: 'exchange market'
  }
  const payload = new Buffer(JSON.stringify(body))
    .toString('base64')

  const signature = crypto
    .createHmac('sha384', apiSecret)
    .update(payload)
    .digest('hex')

  const options = {
    url: completeURL,
    headers: {
      'X-BFX-APIKEY': apiKey,
      'X-BFX-PAYLOAD': payload,
      'X-BFX-SIGNATURE': signature
    },
    body: JSON.stringify(body)
  }

   	return request.post(
  	  options,
  	  function(error, response, body) {
        if(error) { console.log(error, response, body); }
  	    //source
  	    //console.log('response:', JSON.stringify(body, 0, 2))
  	    //std response
  	    console.log(JSON.parse(body))
  	    //created
  	  }
  	)
}

let newOrderBuy = function(tryPrice) {
  let url = "/v1/order/new"
  const nonce = Date.now().toString()
  const completeURL = baseUrl + url
  let body = {
     request: url,
     nonce: Date.now().toString(),
     symbol: 'BTCUSD',
     amount: '0.003017',
     price: String(tryPrice),
     exchange: 'bitfinex',
     side: 'buy',
     type: 'exchange market'
  }
  const payload = new Buffer(JSON.stringify(body))
    .toString('base64')

  const signature = crypto
    .createHmac('sha384', apiSecret)
    .update(payload)
    .digest('hex')

  const options = {
    url: completeURL,
    headers: {
      'X-BFX-APIKEY': apiKey,
      'X-BFX-PAYLOAD': payload,
      'X-BFX-SIGNATURE': signature
    },
    body: JSON.stringify(body)
  }

   	return request.post(
  	  options,
  	  function(error, response, body) {
        if(error) { console.log(error, response, body); }
  	    //source
  	    //console.log('response:', JSON.stringify(body, 0, 2))
  	    //std response
  	    console.log(JSON.parse(body))
  	    //created
  	  }
  	)
}



let comparison = function (_price,_db,_div) {
  //console.log('\n'+'Check price:')
  // if price is 6g500 USD
  for (cp=6000; cp<7001; cp+=50) {
    //console.log(cp);
    let bought = db[cp]["bought"];
    let sold = db[cp]["sold"];
    if (_price===cp) {

      console.log(' - price is '+_price+'\n') // price is *USD*            

      if (!sold) {
       console.log(cp+' [sold] = '+sold+' - now SELL'+'\n'+
                    'turn '+cp+' [sold] to true, turn '+(cp-_div)+' [bought] to false'+'\n');
        newOrderSell(cp);
        _db[cp]["sold"] =true;        
        _db[cp-_div]["bought"]=false;
      };

      if (!bought) {
        console.log(cp+' [bought] = '+bought+' - now BUY'+'\n'+
                    'turn '+cp+' [bought] to true, turn '+(cp+_div)+' [sold] to false'+'\n');
        newOrderBuy(cp);
        _db[cp]["bought"] =true;        
        _db[cp+_div]["sold"]=false;
      };

    } // end of price-cp compare
  } //end of cycle
} //end of function






function writedb() {
    fs.writeFile("./objectSave.json", JSON.stringify(db), (err) => {
      if (err) {
           console.error(err);
          return;
      };
  //console.log("File has been created");
  }); 
  }

let checkPrice = function() {
  request.get(url + '/pubticker/btcusd',
  function(error, response, body) {
      if(error) { console.log(error, response, body); }
      lastPrice = Number(JSON.parse(body).last_price);
        roundedLastPrice = Math.round(lastPrice);
        //console.log(lastPrice+' > '+roundedLastPrice);
        //console.log(body);
      //comparison(price,db);
      comparison(roundedLastPrice,db,divider);
      setTimeout(writedb, 15000);

    });
};

var timerId = setInterval(function() {
  checkPrice();
}, 5000);

var timerId = setInterval(function() {
  console.log(lastPrice+' > '+roundedLastPrice);
}, 60000);
