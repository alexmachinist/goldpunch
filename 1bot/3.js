const request = require('request')
const crypto = require('crypto')

const apiKey = 'tvhgLQaxR7NR5nvdfC8oaOiEj8qvI2oGYOem2k2njGm'
const apiSecret = 'QqGqaZbj24efP1Xvor0VA7hGJiXn8Pst3rUcMq0QSxd'
const baseUrl = 'https://api.bitfinex.com'

const url = "/v1/orders/hist"
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

return request.post(
  options,
  function(error, response, body) {
    //console.log('response:', JSON.stringify(body, 0, 2))
    //console.log(body[1].type)
    //console.log(JSON.parse(body)[1].currency, JSON.parse(body)[1].amount );
    console.log(JSON.parse(body))
  }
)