const { HOST_URL } = require('../config')
const fetch = require('./service')

function $req(payload) {
  console.log(`${payload.url}-${payload.explain}-开始=` + JSON.stringify(payload.data))
  return fetch({
    url: HOST_URL + payload.url,
    data: payload.data,
    dataType: payload.dataType,
    header: payload.header,
    method: payload.method,
    responseType: payload.responseType,
    explain: payload.explain,
    timeout:payload.timeout
  })
}

module.exports = $req
