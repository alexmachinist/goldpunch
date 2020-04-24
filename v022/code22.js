/*

NOT WORKING

10.11.2018

start of program 2018.11.11 1:52

params:
refresh price 20 sec
order funcs is on
amount 0.003

changes:
writes in db is happens only if order succesfull creates
functions for order creates now is simply 
!added time for logs

*/


const url = 'https://api.bitfinex.com/v1'
const request = require('request')
const crypto = require('crypto')
const fs = require('fs');
const format = require("node.date-time");
let lastPrice;
let roundedLastPrice;
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

function logTime() {
  return new Date().format("Y-M-d hh:m:SS")+' ';
}

const apiKey = 'IGHXb4Psfq6h6BCfZWIK70UxlqFycuUeADyVq4Y9bmC'
const apiSecret = 'jbkonhtR3qVQ8xe9aN8Z7QCaFFqYT1AhRFZuBvy925A'
const baseUrl = 'https://api.bitfinex.com'


let newOrderSell = function(cp) {
  let url = "/v1/order/new"
  const nonce = Date.now().toString()
  const completeURL = baseUrl + url
  let body = {
     request: url,
     nonce: Date.now().toString(),
     symbol: 'BTCUSD',
     amount: '0.003',
     price: String(cp),
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


        let bought = db[cp]["bought"];
        let sold = db[cp]["sold"];
        

        console.log(logTime()+cp+' [sold] = '+sold+' - now SELL')
        
        if(error) {console.log(logTime()+error, response, body); }        
        
        console.log(logTime()+JSON.parse(body)+'\n')        
        
        if (!JSON.parse(body).id) {
          console.log(logTime()+' - Do not make new records in db.'  )
        
        } else {
        
          console.log(logTime()+'turn '+cp+' [sold] to true, turn '+
                      (cp-_div)+' [bought] to false'+'\n');
        db[cp]["sold"] =true;        
        db[cp-_div]["bought"]=false;
        }
      }
    )
}

let newOrderBuy = function(cp) {  
  let url = "/v1/order/new"
  const nonce = Date.now().toString()
  const completeURL = baseUrl + url
  let body = {
     request: url,
     nonce: Date.now().toString(),
     symbol: 'BTCUSD',
     amount: '0.003017',
     price: String(cp),
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

        let bought = db[cp]["bought"];
        let sold = db[cp]["sold"];
        
        console.log(logTime()+cp+' [bought] = '+bought+' - now BUY');
        
        if(error) {console.log(logTime()+error, response, body); }        
        
        console.log(logTime()+JSON.parse(body)+'\n')        
        
        if (!JSON.parse(body).id) {
          console.log(logTime()+' - Do not make new records in db.'  )
        
        } else {
        
          console.log(logTime()+'turn '+cp+' [bought] to true, turn '+
                      (cp+_div)+' [sold] to false'+'\n');
        
          db[cp]["bought"] =true;        
          db[cp+_div]["sold"]=false;
        }
      }
    )
}



let comparison = function (_price,_db,_div) {
  //console.log('\n'+'Check price:')
  // if price is 6g500 USD
  for (cp=6000; cp<7001; cp+=50) {
    //console.log(cp);
    //let bought = db[cp]["bought"];
    //let sold = db[cp]["sold"];
    if (_price===cp) {
      console.log(logTime()+' - price is '+_price+'\n') // price is *USD*            
      if (!sold) {
        //console.log(cp+' [sold] = '+sold+' - now SELL')
        newOrderSell(cp);
        /*
        console.log('turn '+cp+' [sold] to true, turn '+(cp-_div)+' [bought] to false'+'\n');
        _db[cp]["sold"] =true;        
        _db[cp-_div]["bought"]=false;
        */
      };
      if (!bought) {
        //console.log(cp+' [bought] = '+bought+' - now BUY');
        newOrderBuy(cp);
        /*
        console.log('turn '+cp+' [bought] to true, turn '+(cp+_div)+' [sold] to false'+'\n');
        _db[cp]["bought"] =true;        
        _db[cp+_div]["sold"]=false;
        */
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
      if(error) {console.log(logTime()+error, response, body); }
      lastPrice = Number(JSON.parse(body).last_price);
        roundedLastPrice = Math.round(lastPrice);
        //console.log(logTime()+'check '+lastPrice+' > '+roundedLastPrice);
        //console.log(body);
      //comparison(price,db);
      comparison(roundedLastPrice,db,divider);
      setTimeout(writedb, 15000);

    });
};

var timerId = setInterval(function() {
  checkPrice();
}, 60000);

var timerId = setInterval(function() {
  console.log(logTime()+' '+lastPrice+' > '+roundedLastPrice);
}, 60000);
