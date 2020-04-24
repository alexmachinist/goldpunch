const request = require('request')
const url = 'https://api.bitfinex.com/v1'

request.get(url + '/book/btcusd',
  function(error, response, body) {
    if (error) {'\n'+console.log('req-error '+error,'req-response '+response,'req-body '+body); }
    console.log(JSON.parse(body));
})