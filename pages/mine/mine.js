// pages/mine/mine.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    membersInfo:{},
  },
  //礼品列表
  gift:function(){
    wx.navigateTo({
      url: '../gift/gift'
    })
  },
  //联系作者
  contact:function(){
    wx,wx.setClipboardData({
      data: 'MillFun',
      success: function(res) {
        wx.showToast({
          title: '复制微信成功',
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '复制失败，请稍后再试！',
        })},
      complete: function(res) {},
    })
  },
  canvas:function(){
    wx.navigateTo({
      url: '../canvas/canvas?openid='+ app.globalData.openid
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    //获取用户个人信息
    app.func.getMembersInfos(function (res) {
      console.log(res)
      that.setData({
        membersInfo: res
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  //分享
  //分享
  onShareAppMessage: function () {
    return {
      title: '怪兽研习社-每日打卡小程序',
      desc: '专为怪兽研习社研发的打卡小程序哦~',
      path: '/pages/index/index',
      imageUrl: 'https://milfun.fun/mp/weixinapp/images/share.jpg'
    }
  }
})