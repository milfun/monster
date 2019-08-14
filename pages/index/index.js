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
    list2: {},
    openid: app.globalData.openid,
    membersInfo: null,
    uid: app.globalData.uid,
    btn1:{},
    btn2: {},
  },
  //事件处理函数
  goLuck: function() {
    wx.navigateTo({
      url: '../luck/luck'
    })
  },
  //web-view打开
  goweb:function(t){
    //跳转
    wx.navigateTo({
      url: '../view/view?aid='+encodeURI(t)
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
      //console.log(res)
      //用户没注册过，
        if (res.status){
          if (res.status==1){
            that.setData({
              uid: res.list.uid
            })
          }
          
          //打卡
          app.func.sign({ openid: app.globalData.openid, aid: aid }, function (aa) {
            console.log(aa.msg)
            if(aa.status==1){
              wx.showToast({
                title: '打卡成功',
                icon: 'success',
                duration: 2000
              })
              that.goweb(aa.aid)
            }
            else{
              app.func.showMo('提示消息', aa.msg)
            }
            //
            
            
          })
        }else{
          app.func.showMo('提示消息', '请授权后再使用本功能')
        }
        
    })
      
      
},//注册完直接打卡

  onLoad: function () {
    var that = this
    //获取openid
    app.func.getWxUerinfo(function (res) {
      //console.log(res)
      
    })

    var that =this
    //首页打卡文章1
    app.func.req('c=index&a=getarticle', {}, function (res) {
      if (res.status) {
        that.setData({
          list: res.list,
          list2:res.list2
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

  //分享
  onShareAppMessage: function () {
      return {
        title: '怪兽研习社-每日打卡小程序',
        desc: '专为怪兽研习社研发的打卡小程序哦~',
        path: 'https://milfun.fun/mp/weixinapp/images/share.jpg'
      }
  }
})
