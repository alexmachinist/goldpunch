/*
start of program 05.11.2018 22:38
  stopped by bitfinex 06.11 ~morning - lunch

start 6.11 22:00-23:00

params:
refresh price 20 sec
order funcs is on

changes:
db array to object
divider 50usd
db divider 50usd
export db to json
export inside CheckPrice();
detailed comment in switches
*/


const url = 'https://api.bitfinex.com/v1'
const request = require('request')
const crypto = require('crypto')
var fs = require('fs');
let lastPrice;
let divider = 50;
let db = {};
/*
try {
    db = fs.readFileSync('object.json', 'utf-8')
} catch (ex) {
    console.log(ex)
}
 */

///*
		for (x=6000; x<7001; x+=50) {
			db[x] = {
				//"price": x,
				"sold": false,
				"bought": true};
			};
      //*/
db[6400]["sold"]=true;
db[6450]["bought"]=false;


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
  	    //source
  	    //console.log('response:', JSON.stringify(body, 0, 2))
  	    //std response
  	    console.log(JSON.parse(body))
  	    //created
  	  }
  	)
}



let comparison = function (_price,_db,_divider) {
	console.log('\n'+'Check price:')
	// if price is 6g500 USD
	for (cp=6000; cp<7001; cp+=50) {
		//console.log(cp);

		switch (_price) {	
		case cp:
			console.log(' - price is '+_price)
			switch (_db[cp+_divider]["sold"]) { 							/* //start comp. 'sold'		*/	
			case true:
			//if +div SOLD do order buy
				console.log('\n'+'Check '+(cp+_divider)+'.sold'+'\n'+
									' - is true'+'\n'+
									' - do order buy at '+cp)
				//buy and record to db, that it bought

				newOrderBuy(cp);
				console.log(newOrderBuy);
				
				//+div db: before 'true'. after 'false'
        //sold on top (+divider) is not relevant because here bought
				_db[cp+_divider]["sold"] = false;
				
				//current db: before 'false', after 'true'
        //current amount is bought			
				_db[cp]["bought"] = true;
        console.log(cp-_divider+'\n'+cp+'\n'+cp+_divider);
			break;
			case false:
			//if +div NOT SOLD
				console.log('\n'+'Check '+(cp+_divider)+'.sold'+'\n'+
						' - is false'+'\n'+
						' - go on'+'\n')
				switch (_db[cp-_divider]["bought"]) {						//start comp. 'bought' (in sold)
					case true:
					//if if -div BOUGHT	
						console.log('\n'+'Check '+(cp-_divider)+'.bought'+'\n'+
									' - is true'+'\n'+
									' - do order sell at '+cp)
						//sell and record to db, that it sold

						newOrderSell(cp);
						console.log(newOrderBuy);

						//-div db: before 'true'. after 'false'
            //bought on bottom (-div) is not relevant because here sold
						_db[cp-_divider]["bought"] = false;
				
						//current db: before 'false', after 'true'
            //current amount is sold			
						_db[cp]["sold"] = true;
            console.log(cp-_divider+'\n'+cp+'\n'+cp+_divider);
					break; // case if 
					} 													//end comp. 'bought' (in sold)
				break; //break case false of sold compare						
			break; //break  of (switch sold of (case false)
			} //end of switch sold 
		default:
			//console.log('Ne sovpadaet');
		} //end of switch price
	} //end of cycle
} //end of function

function writedb() {
    fs.writeFile("./object.json", JSON.stringify(db), (err) => {
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
			lastPrice = Number(JSON.parse(body).last_price);
   			roundedLastPrice = Math.round(lastPrice);
   			console.log(lastPrice+' > '+roundedLastPrice);
        console.log(body);
			//console.log(body);
			//comparison(price,db);
			comparison(roundedLastPrice,db,divider);
      setTimeout(writedb, 15000);

		});
};

var timerId = setInterval(function() {
	checkPrice();

}, 20000);
