//app.js
var commonFun = require('common-fun.js')
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          // 没有授权，重定向到 loading 启动页
          wx.navigateTo({
            url: '/pages/loading/loading'
          })
        }
      }
    })
  },
  func:{
    req: commonFun.req,//http 请求
    o_req: commonFun.o_req,//http 请求
    getWxUerinfo: commonFun.getWxUerinfo,//获取openid
    getMembersInfos: commonFun.getMembersInfos,//获取会员信息
    getLocation: commonFun.getLocation,//获取经纬度
    sign: commonFun.sign,//参与打卡
    getLesson: commonFun.getLesson,//获取课程
    showBtn: commonFun.showBtn,
    showMo: commonFun.showMo,
  },
  globalData: {
    userInfo: null,
    openid: '',
    membersInfo: null,
    uid:'',
  }
})