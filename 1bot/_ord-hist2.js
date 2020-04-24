const crypto = require('crypto')
const request = require('request')

const url = "https://api.bitfinex.com/v2/"

const apiKey = 'tvhgLQaxR7NR5nvdfC8oaOiEj8qvI2oGYOem2k2njGm'
const apiSecret = 'QqGqaZbj24efP1Xvor0VA7hGJiXn8Pst3rUcMq0QSxd'

const apiPath = 'v2/auth/r/orders/tBTCUSD/hist'
const nonce = Date.now().toString()
const queryParams = 'type=price'
const body = {}
let signature = `/api/${apiPath}${nonce}${JSON.stringify(body)}`

const sig = crypto.createHmac('sha384', apiSecret).update(signature)
const shex = sig.digest('hex')

const options = {
  url: `https://api.bitfinex.com/${apiPath}?${queryParams}`,
  headers: {
    'bfx-nonce': nonce,
    'bfx-apikey': apiKey,
    'bfx-signature': shex
  },
  body: body,
  json: true
}
request.post(options, (error, response, body) => {
  //console.log(JSON.parse(body));
  console.log(body);
})