const { GET_TOKEN_SYNC } = require('../utils/storage/token')

function fetch(options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: options.url,
      data: options.data,
      header: options.header || {
        'Content-Type': 'application/json',
        'token':GET_TOKEN_SYNC()
      },
      method: options.method || 'GET',
      timeout:options.timeout || 10000,
      dataType: 'json',
      responseType: options.responseType || 'text',
      success: (res) => {
        console.log(`${options.url}-${options.explain}-结束=` + JSON.stringify(res.data))
        if(res.data.retcode== '000000'){
          resolve(res.data)
        } else if(res.data.retcode == '000001'){
          reject(res.data.retinfo)
        } else{
          reject(res.data)
        }
      },
      fail: (res) => {
        reject(res)
      }
    })
  })
}

module.exports = fetch
