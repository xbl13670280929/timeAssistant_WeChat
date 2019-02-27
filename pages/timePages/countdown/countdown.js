//倒计时
const app = getApp()

Page({
  data: {
    // 计时单位(毫秒)
    timeUnit: 10,
    // 倒计剩余时间
    overTime: 0,
    // 倒计剩余时间-可识别字符串
    overTimeStr: 0,
    // 倒计器id
    prevTimeId: null,
    
    // 正在倒计
    cdDoingFlag: false,
    // 暂停倒计
    stopCdFlag: false,
    // 结束倒计
    overCdFlag: true,
    
    //倒计时间
    cdTimeList: [],
    cdTimeIndex: '0',
    //倒计方式
    cdTypeList: ['单次', '连续'],
    cdTypeIndex: '0',
    
    // 倒计按钮文字-单次
    signTimeTips: '开始',
    // 倒计按钮文字-连续
    contTimeTips: '开始',

    // 暂停数据-单次
    signStopList: [],
    // 暂停数据-连续
    contStopList: [],

  },
  // 事件-倒计时间-变化
  bindCdTimeChange: function (e) {
    this.setData({
      cdTimeIndex: e.detail.value
    })
    this.overCd()
  },
  // 事件-倒计方式-变化
  bindCdTypeChange: function (e) {
    this.setData({
      cdTypeIndex: e.detail.value
    })
    this.overCd()
  },
  // 获取 cdTime
  getCdTime: function (e) {
    let cdTime = this.data.cdTimeList[this.data.cdTimeIndex] || 0
    //cdTime = 0.1
    return cdTime * 1000
  },
  // 将毫秒转成可用字符串
  getTimeStrFromOverTime: function () {
    let overTime = this.data.overTime
    let oversecond = ('' + overTime).slice(0, -3) || '0'
    let overmillisecond = ('000000' + overTime).slice(-3, -1)
    return oversecond + '.' + overmillisecond
  },
  // 开始倒计
  startCd: function (callback) {
    let prevTimeId = setInterval(() => {
      let overTime = this.data.overTime - this.data.timeUnit
      let oversecond = ('' + overTime).slice(0, -3) || '0'
      let overmillisecond = ('000000' + overTime).slice(-3, -1)
      let overTimeStr = oversecond + '.' + overmillisecond
      this.setData({
        overTime: overTime,
        overTimeStr: overTimeStr
      })
      if (overTime <= 0) {
        this.overCd()
      }
    }, this.data.timeUnit)

    this.setData({
      prevTimeId: prevTimeId,
      cdDoingFlag: true,
      stopCdFlag: false,
      overCdFlag: false
    })
  },
  // 暂停倒计
  stopCd: function () {
    clearInterval(this.data.prevTimeId)
    this.setData({
      cdDoingFlag: false,
      stopCdFlag: true,
      overCdFlag: false
    })
  },
  // 结束倒计
  overCd: function () {
    clearInterval(this.data.prevTimeId)
    this.setData({
      cdDoingFlag: false,
      stopCdFlag: false,
      overCdFlag: true,
      overTime: 0
    })
  },
  // 事件-单次-开始倒计
  bindCountdownSign: function (e) {
    let cdDoingFlag = this.data.cdDoingFlag
    let stopCdFlag = this.data.stopCdFlag
    let overCdFlag = this.data.overCdFlag

    if (overCdFlag) {//首次启动
      this.signCdFirstStart()
    } else if (cdDoingFlag && !stopCdFlag) {//暂停--停
      this.signCdToStop()
    } else if (!cdDoingFlag && stopCdFlag) {//暂停--起
      this.signCdToStart()
    }
  },
  // 单次-首次起动
  signCdFirstStart: function () {
    this.setData({
      signTimeTips: '暂停',
      signStopList: [],
      overTime: this.getCdTime() * 60
    })
    this.startCd()
  },
  // 单次-暂停-停
  signCdToStop: function () {
    let list = JSON.parse(JSON.stringify(this.data.signStopList))
    list.push(this.getTimeStrFromOverTime())
    this.setData({
      signTimeTips: '继续',
      signStopList: list
    })
    this.stopCd()
  },
  // 单次-暂停-始
  signCdToStart: function () {
    this.setData({
      signTimeTips: '暂停'
    })
    this.startCd()
  },
  // 单次-停止
  signCdToOver: function () {
    if (this.data.overCdFlag) {
      return
    }
    this.signCdToStop()
    this.setData({
      signTimeTips: '开始'
    })
    this.overCd()
  },

  // 事件-连续-开始倒计
  bindCountdownCont: function (e) {
    let cdDoingFlag = this.data.cdDoingFlag
    let stopCdFlag = this.data.stopCdFlag
    let overCdFlag = this.data.overCdFlag

    if (overCdFlag) {//首次启动
      this.contCdFirstStart()
    } else if (cdDoingFlag && !stopCdFlag) {//暂停--停
      this.contCdToStop()
    } else if (!cdDoingFlag && stopCdFlag) {//暂停--起
      this.contCdToStart()
    }
  },
  // 连续-首次起动
  contCdFirstStart: function () {
    this.setData({
      contTimeTips: '暂停',
      contStopList: [],
      overTime: this.getCdTime() * 60
    })
    this.startCd()
  },
  
  // 连续-暂停-停
  contCdToStop: function () {
    let overTime = this.data.overTime
    let oversecond = ('' + overTime).slice(0, -3) || '0'
    let overmillisecond = ('000000' + overTime).slice(-3, -1)

    let list = JSON.parse(JSON.stringify(this.data.contStopList))
    list.push(this.getTimeStrFromOverTime())
    this.setData({
      contTimeTips: '继续',
      contStopList: list
    })
  },
  // 连续-暂停-始
  contCdToStart: function () {
    this.setData({
      contTimeTips: '暂停'
    })
    this.startCd()
  },
  // 连续-停止
  contCdToOver: function () {
    if (this.data.overCdFlag) {
      return
    }
    this.contCdToStop()
    this.setData({
      contTimeTips: '开始'
    })
    this.overCd()
  },


  
  onLoad: function () {
    let commonTime = app.globalData.commonTime

    this.setData({
      cdTimeList: commonTime.minutesUse
    })
  }
})
