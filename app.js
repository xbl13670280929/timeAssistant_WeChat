//app.js
const commonTime = require('./utils/commonTime.js')

App({
  onLaunch: function () {
    
  },
  globalData: {
    userInfo: null,
    commonTime: commonTime
  }
})