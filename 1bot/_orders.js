//выводит активные ордеры

const request = require('request')
const crypto = require('crypto')

const apiKey = 'IGHXb4Psfq6h6BCfZWIK70UxlqFycuUeADyVq4Y9bmC'
const apiSecret = 'jbkonhtR3qVQ8xe9aN8Z7QCaFFqYT1AhRFZuBvy925A'
const baseUrl = 'https://api.bitfinex.com'

const url = '/v1/orders'
const nonce = Date.now().toString()
const completeURL = baseUrl + url
const body = {
  request: url,
  nonce: Date.now().toString()
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
    //console.log('response:', JSON.stringify(body, 0, 2))
    console.log(body)
  }
)