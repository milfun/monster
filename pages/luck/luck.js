// pages/luck/luck.js
//计数器
var interval = null;

//值越大旋转时间越长  即旋转速度
var intime = 50;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
    //9张奖品图片
    images: ['../public/images/item2.png', '../public/images/item1.png', '../public/images/item2.png', '../public/images/item1.png', '../public/images/item2.png', '../public/images/item1.png', '../public/images/item2.png', '../public/images/item1.png', '../public/images/item2.png'],

    //确定按钮
    btnconfirm: '../public/images/dianjichoujiang.png',

    //点击事件
    clickLuck: 'clickLuck',
    //中奖位置
    luckPosition: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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