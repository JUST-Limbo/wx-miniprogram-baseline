let config = require('./config/env')

// 当前环境
let env = 'Dev'
// baseurl
App.HOST_URL = config[env]


App({
  onLaunch: function () {},
  globalData: {
    userInfo: null
  }
})