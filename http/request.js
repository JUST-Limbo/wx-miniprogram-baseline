const store = require('../utils/store')
const API = require('../api')

// 头信息
const header = {
  'Content-Type': 'application/json',
  'token': store.getItem('token')
}

function $req(payload) {
  return new Promise((resolve, reject) => {
    // 请求报文
    START_REQUEST(payload)
    wx.request({
      // 请求地址
      url: App.HOST_URL + API[payload.url],
      data: payload.data,
      header: header,
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
      fail: (err) => {
        reject('请求失败')
        console.warn(JSON.stringify(err))
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

module.exports = $req
