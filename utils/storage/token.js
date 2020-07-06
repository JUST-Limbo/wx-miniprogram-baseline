const SET_TOKEN_SYNC = (value) => {
  try {
    wx.setStorageSync('token', value)
  } catch (error) {
    console.log(error)
  }
}

const GET_TOKEN_SYNC = () => {
  try {
    var value = wx.getStorageSync('token')
    if (value) {
      return value
    } else {
      return ""
    }
  } catch (error) {
    console.log(error)
    return ""
  }
}

module.exports = {
  SET_TOKEN_SYNC,
  GET_TOKEN_SYNC
}