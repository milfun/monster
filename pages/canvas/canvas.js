// pages/canvas/canvas.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
ss:ss,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var o=this;
    wx.getSystemInfo({
      success: function (t) {
        o.setData({
          width: t.windowWidth,
          height: t.windowHeight,
        });
      }
    }),
      wx.showLoading({
        title: '生成中',
      })
      o.cc();
  },
  cc: function () {

    var e = this,
      a = e.data,
      /************1920/1080=1.77777*****宽高比例系数**** */
      w = a.width,
      m = 1.77777,
      h = w * m,
      /************************************************* */
      name = 'milfun',
      day = 3,
      total = 45829,
      descs = "世界这么大，我们一起学习吧",
      logo = "../public/images/logo.jpg",
      bg = "../public/images/bb.jpg",
      c = wx.createCanvasContext("cc")
    c.drawImage(bg, 0, 0, w, h)
    /*************画圆************** *
    //开始路径画圆,剪切处理
    c.save();
    c.beginPath();
    c.arc(w / 2, 0.108 * h + 40, 40, Math.PI * 2, false);
    c.clip(); //剪切路径
    c.drawImage(a.logo, w / 2 - 40, 0.108 * h, 80, 80),
      //恢复状态
      c.restore();
    /*************************** */
    c.setFillStyle("#FFF")
    c.setFontSize(24)
    c.fillText(name, (w - c.measureText(name).width) * 0.5, 0.303 * h)
    c.setFillStyle("#000")
    c.setFontSize(18)
    c.fillText(day, (w - c.measureText(day).width) * 0.5, 0.393 * h)
    c.setFillStyle("#fff")
    c.setFontSize(18)
    c.fillText(total, (w - c.measureText(total).width) * 0.5, 0.479 * h)
    c.setFontSize(24)
    c.fillText(descs, (w - c.measureText(descs).width) * 0.5, 0.54 * h),
      c.drawImage(logo, w / 2 - 70, 0.712 * h, 120, 120),
      c.draw();
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
  onShareAppMessage: function () {

  }
})