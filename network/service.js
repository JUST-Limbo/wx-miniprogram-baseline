const { GET_TOKEN_SYNC } = require('../utils/storage/token')
const { HOST_URL } = require('../config')
const API = require('../api')

function $req(payload) {
  return new Promise((resolve, reject) => {
    // 参数校验
    if (!PARAMS_VALIDATOR(payload, reject)){
      return
    }
    // 请求报文
    START_REQUEST(payload)
    wx.request({
      url: HOST_URL + API[payload.url],
      data: payload.data,
      header: payload.header || {
        'Content-Type': 'application/json',
        'token': GET_TOKEN_SYNC()
      },
      method: payload.method || 'POST',
      timeout: payload.timeout || 10000,
      dataType: payload.dataType || 'json',
      responseType: payload.responseType || 'text',
      success: (res) => {
        // 响应报文
        GET_RESPONSE(payload)
        if (res.data.retcode == '000000') {
          resolve(res.data)
        } else if (res.data.retcode == '000001') {
          reject(res.data.retinfo)
        } else {
          reject(res.data)
        }
      },
      fail: (res) => {
        reject('请求失败')
        console.warn(JSON.stringify(res))
      }
    })
  })
}

function START_REQUEST(payload) {
  console.log(`${payload.url}-${payload.explain}-开始=` + JSON.stringify(payload.data))
}

function GET_RESPONSE(payload) {
  console.log(`${payload.url}-${payload.explain}-结束=` + JSON.stringify(res.data))
}

function PARAMS_VALIDATOR(payload, reject) {
  payload.requiredProps.forEach((item,index,array) => {
    if(!payload.data[item]){
      reject(`参数错误 ${item}`)
      return false
    }
  })
  return true
}

module.exports = $req
