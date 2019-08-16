// pages/lesson/lessonlist.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
  },
  showlesson: function (t) {
    //人气加一
    var aa=2;
    var that=this
    var a = t.currentTarget.dataset.aid;
    app.func.req('c=index&a=addHot', {aa:aa,aid:a}, function (res) {

    })
  //跳转
   
    wx.navigateTo({
      url: '../view/view?aid=' + a
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    //首页打卡文章1
    app.func.req('c=index&a=articlelist', {}, function (res) {
      if (res.status) {
        that.setData({
          list: res.list
        })
      }
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
  onShareAppMessage: function () {
    return {
      title: '怪兽研习社-每日打卡小程序',
      desc: '专为怪兽研习社研发的打卡小程序哦~',
      path: '/pages/index/index',
      imageUrl: 'https://milfun.fun/mp/weixinapp/images/share.jpg'
    }
  }
})