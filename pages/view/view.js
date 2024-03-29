// pages/view/view.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    web_src: '', //webview内嵌的url
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var aid = options.aid
    if(options.link){
      that.setData({
        web_src: options.link
      })
    }else{
      //根据aid获取跳转链接
      app.func.req('c=index&a=viewArticle&aid=' + aid, {}, function (res) {
        if (res.status) {
          /* wx.showToast({
             title: res.list.link,
           })*/
          that.setData({
            web_src: res.list.link
          })
        }
      })
    }
    
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
  onShareAppMessage: function () {
    return {
      title: '怪兽研习社-每日打卡小程序',
      desc: '专为怪兽研习社研发的打卡小程序哦~',
      path: '/pages/index/index',
      imageUrl: 'https://milfun.fun/mp/weixinapp/images/share.jpg'
    }
  }
})