const request = require('request')
const crypto = require('crypto')
const format = require("node.date-time");

const apiKey = 'tvhgLQaxR7NR5nvdfC8oaOiEj8qvI2oGYOem2k2njGm'
const apiSecret = 'QqGqaZbj24efP1Xvor0VA7hGJiXn8Pst3rUcMq0QSxd'
const baseUrl = 'https://api.bitfinex.com'

const url = "/v1/balances"
const nonce = Date.now().toString()
const completeURL = baseUrl + url
const body = {
  request: url,
  nonce
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

let checkPrice = function() {
  request.get('https://api.bitfinex.com/v1/pubticker/btcusd',
  function(error, response, body) {
    if(error) {console.log(error, response, body); }        
        let lastPrice = Number(JSON.parse(body).last_price);
        let roundedLastPrice = Math.round(lastPrice);
        console.log(lastPrice+' > '+roundedLastPrice);    
        console.log(usd)    

        console.log(body);
      //console.log(body);
      //comparison(price,db);
      //comparison(roundedLastPrice,db,divider);
    });
};

function logTime() {
  return new Date().format("Y-M-d hh:m:SS")+' ';
}


return request.post(
  options,
  function(error, response, body) {
    //console.log('response:', JSON.stringify(body, 0, 2))   //source
    console.log('\n'+logTime()+JSON.parse(body)[1].currency, JSON.parse(body)[1].amount );   //BTC
    let btc = Number(JSON.parse(body)[1].amount);
    console.log(logTime()+JSON.parse(body)[3].currency, JSON.parse(body)[3].amount );   //USD
    let usd = Number(JSON.parse(body)[3].amount);

    
    
  request.get('https://api.bitfinex.com/v1/pubticker/btcusd',
  function(error, response, body) {
    if(error) {console.log(error, response, body); }        
        let price = Number(JSON.parse(body).last_price);
        //let roundedPrice = Math.round(price);
        //console.log(price+' > '+roundedPrice);    
      console.log(logTime()+'price '+price);
      let equsd = usd + btc*price;
      console.log(logTime() + equsd.toFixed(2));
      let eqbtc = btc + usd/price;
      console.log(logTime() + eqbtc.toFixed(7));
    });


  }
)