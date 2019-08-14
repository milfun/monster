// pages/canvas/canvas.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:{},
    logo:'',
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
    //获取用户数据
      app.func.req('c=index&a=canvas&openid=' + e.openid, {}, function (res) {
        console.log(res)
          o.setData({
            list: res,
          });
          wx.downloadFile({
            //url: res.data.qrimg,
            url: res.logo,
            success: function (t) {
              o.setData({
                logo: t.tempFilePath
              });
              o.cc();
              wx.hideLoading()
            }
          });
      })

  },
  cc: function () {

    var e = this,
      a = e.data,
      /************1920/1080=1.77777*****宽高比例系数**** */
      /**500/375=1.333**/
      w = a.width,
      m = 1.33333,
      h = w * m,
      /************************************************* */
      name = a.list.name,
      day = a.list.day,
      total = a.list.total,
      descs = a.list.descs,
      logo = a.logo,
      bg = a.list.bg,
      scan = a.list.scan,
      c = wx.createCanvasContext("cc")
    c.drawImage(bg, 0, 0, w, h)
    /*************画圆************** */
    //开始路径画圆,剪切处理
    c.save();
    c.beginPath();
    c.arc(w / 2, 0.035 * h +30, 30, Math.PI * 2, false);
    c.clip(); //剪切路径
    c.drawImage(logo, w / 2 - 30, 0.035 * h, 60, 60),
      //恢复状态
      c.restore();
    /*************************** */
    c.setFillStyle("#000")
    c.setFontSize(14)
    c.fillText(name, (w - c.measureText(name).width) * 0.5, 0.192 * h)
    c.setFillStyle("#FFF")
    c.setFontSize(26)
    c.fillText(day, (w - c.measureText(day).width) * 0.5, 0.355 * h)
    c.setFillStyle("#bbb")
    c.setFontSize(14)
    c.fillText(total, 0.08 * w, 0.619 * h)
    c.setFontSize(14)
    c.fillText(scan, 0.08 * w, 0.669 * h)
    c.setFillStyle("#ffe300")
    c.setFontSize(16)
    c.fillText(descs, (w - c.measureText(descs).width) * 0.5, 0.54 * h),
      c.draw();
  },
  totemp: function (t) {
    var a = this.data.width,
      e = this.data.canvas_height;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: a,
      height: e,
      canvasId: "cc",
      success: function (t) {
        wx.saveImageToPhotosAlbum({
          filePath: t.tempFilePath,
          success: function (t) {
            wx.showToast({
              title: "保存成功"
            }), setTimeout(function () {
              wx.navigateBack({
                delta: 2
              });
            }, 1500);
          },
          fail: function (t) { },
          complete: function (t) { }
        });
      }
    });
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