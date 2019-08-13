// pages/luck/luck.js
//计数器
//获取应用实例
const app = getApp()

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
    luckPosition: 7,
    membersInfo:{},
  },
  //进入页面时缓慢切换
  loadAnimation: function () {
    var e = this;
    //初始位置为0
    var index = 0;
    //每1秒钟切换一次位置
    interval = setInterval(function () {
      if (index > 7) {
        index = 0;
        e.data.color[7] = 0.5
      } else if (index != 0) {
        e.data.color[index - 1] = 0.5
      }
      e.data.color[index] = 1
      e.setData({
        color: e.data.color,
      })
      index++;
    }, 1000);
  },
  //which为中奖位置  需要停止时调用该方法
  stop: function (which) {
    var e = this;
    //清空计数器
    clearInterval(interval);
    //初始化当前位置
    var current = -1;
    var color = e.data.color;
    for (var i = 0; i < color.length; i++) {
      if (color[i] == 1) {
        current = i;
      }
    }
    //下标从1开始
    var index = current + 1;

    e.stopLuck(which, index, intime, 10);
    return 1;
  },
  /**
   * which:中奖位置
   * index:当前位置
   * time：时间标记
   * splittime：每次增加的时间 值越大减速越快
   */
  stopLuck: function (which, index, time, splittime) {
    var e = this;
    //值越大出现中奖结果后减速时间越长
    var color = e.data.color;
    setTimeout(function () {
      //重置前一个位置
      if (index > 7) {
        index = 0;
        color[7] = 0.5
      } else if (index != 0) {
        color[index - 1] = 0.5
      }
      //当前位置为选中状态
      color[index] = 1
      e.setData({
        color: color,
      })
      //如果旋转时间过短或者当前位置不等于中奖位置则递归执行
      //直到旋转至中奖位置
      if (time < 400 || index != which) {
        //越来越慢
        splittime++;
        time += splittime;
        //当前位置+1
        index++;
        e.stopLuck(which, index, time, splittime);
      } 
    }, time);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getluck:function(t){
    var e = this
    
  },
  test:function(t){
    //获取用户信息
    var e = this,
    uid = t.currentTarget.dataset.uid;
    app.func.req('c=index&a=getLuck', {uid:uid}, function (res) {
      console.log(res)
      if(res.status==1){
        //模拟网络请求时间  设为两秒
        var stoptime = 500;
        setTimeout(function () {
          if (e.stop(res.luckid)) 
         {
            setTimeout(function () { app.func.showMo('抽奖提示', '恭喜你获得' + res.yes)}, 6000);
         }
        }, stoptime)
      }else{
        app.func.showMo('抽奖提示', '您的抽奖次数已经用完，明天再来抽吧')
      }
    })
  },
  onLoad: function (options) {
    var that= this
    //获取用户个人信息
    app.func.getMembersInfos(function (res) {
      //console.log(res)
      that.setData({
        membersInfo: res
      })
      //获取用户初始数据
      app.func.req('c=index&a=showLuck', { uid: that.data.membersInfo.uid }, function (res) {
        console.log(res)
        that.setData({
          totalnum: res.totalnum,
          number:res.number
        })
      })
    })
    //缓慢变换
    this.loadAnimation()
    

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