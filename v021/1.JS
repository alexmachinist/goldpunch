const url = 'https://api.bitfinex.com/v1'
const request = require('request')
const crypto = require('crypto')

const apiKey = 'IGHXb4Psfq6h6BCfZWIK70UxlqFycuUeADyVq4Y9bmC'
const apiSecret = 'jbkonhtR3qVQ8xe9aN8Z7QCaFFqYT1AhRFZuBvy925A'
const baseUrl = 'https://api.bitfinex.com'

let newOrderSell = function() {
  let url = "/v1/order/new"
  const nonce = Date.now().toString()
  const completeURL = baseUrl + url
  let body = {
     request: url,
     nonce: Date.now().toString(),
     symbol: 'BTCUSD',
     amount: '0.003',
     price: (10000).toString(),
     exchange: 'bitfinex',
     side: 'sell',
     type: 'exchange limit'
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

newOrderSell();