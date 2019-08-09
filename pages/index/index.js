//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    list:{},
    openid: app.globalData.openid,
    membersInfo: null,
    uid: app.globalData.uid,
    btn1:{},
    btn2: {},
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //web-view打开
  goweb:function(t){
    //跳转
    var e = this,
    a = t.currentTarget.dataset.aid;
    wx.navigateTo({
      url: '../view/view?aid='+encodeURI(a)
    })
  },
  btn:function(t){
    var e = this,
    a = t.currentTarget.dataset.link;
    wx.navigateTo({
      url: '../view/view?link=' + a
    })
  },
  //排行榜
  rank:function(){
    wx.navigateTo({
      url: '../rank/rank'
    })
  },

  //注册用户
  loginreg: function (t) {
    var that = this
    var aid = t.currentTarget.dataset.aid;
    app.func.req('c=index&a=wxreg_user', {
      nickname: app.globalData.userInfo.nickName,
      openid: app.globalData.openid,
      headimg: app.globalData.userInfo.avatarUrl
    }, function (res) {
      //用户没注册过，直接打卡
      if (res.status){
        that.setData({
          uid: res.list.uid
        })
        app.func.sign({ openid: app.globalData.openid, aid: aid }, function (res) {

        })
      }else{
        //打卡
        wx.showModal({
          title: '小提示',
          content: '打卡失败，使用前请授权登陆，或者请联系开发者MilFun',
        })
      }
      
    })
    //console.log(res.data)
    
  },
  onLoad: function () {
    var that = this
    //获取openid
    app.func.getWxUerinfo(function (res) {
      console.log(res)
      
    })

    var that =this
    //首页打卡文章1
    app.func.req('c=index&a=getarticle', {}, function (res) {
      if (res.status) {
        that.setData({
          list: res.list
        })
      }
    })
    //获取按钮信息
    app.func.showBtn(function (res) {
      //console.log(res)
      that.setData({
        btn1: res.shift(),
        btn2: res.pop()

      })
    })
  },

  
})
