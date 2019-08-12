/************服务器调试***********/
var rootDocment = 'https://milfun.fun/m/api/index.php?m=Home&'
var secretKey = 'MilFun'
/****************使用请打开详情里面：https检测*************** */

/************本地调试***********
var rootDocment = 'http://localhost/api/index.php?m=Home&'
var secretKey = 'MilFun'
/**********************/
function req(url, data, cb) {
  var app = getApp()
  //url: rootDocment + url + "&secretKey=" + secretKey,
  wx.request({
    url: rootDocment + url,
    data: data,
    method: 'get',
    header: { 'Content-Type': 'application/json' },
    success: function (res) {
      return typeof cb == "function" && cb(res.data)
    },
    fail: function (err) {
      console.log(err)
      // return typeof cb == "function" && cb(err)
    }
  })
}
function o_req(url, data, cb) {
  var app = getApp()
  wx.request({
    url: rootDocment + url + "&secretKey=" + secretKey + "&openid=" + app.globalData.openid,
    data: data,
    method: 'get',
    header: { 'Content-Type': 'application/json' },
    success: function (res) {
      return typeof cb == "function" && cb(res.data)
    },
    fail: function (err) {
      console.log(err)
      // return typeof cb == "function" && cb(err)
    }
  })
}

function getWxUerinfo(cb) {
  //调用微信登录接口  
  wx.login({
    success: function (loginCode) {
      var app = getApp()
      app.func.req('c=index&a=getWxUerinfo', { 'code': loginCode.code }, function (res){
		    app.globalData.openid = res.data.openid
        app.globalData.WxUerinfo = res.data
        return typeof cb == "function" && cb(res.data)
        
      })
    }
  })
}

//获取经纬度
function getLocation() {
  wx.getLocation({
    success: function (res) {
      var app = getApp()
      app.location.longitude = res.longitude
      app.location.latitude = res.latitude
      console.log(app.location.latitude)
    }
  })
}
//获取用户信息
function getMembersInfos(cb) {
  var app = getApp()
  var membersInfo = app.globalData.membersInfo
  app.func.o_req('c=index&a=getMembersInfos', {}, function (res) {
    if (res.status == 1) {
      app.globalData.membersInfo = res.data
      return typeof cb == "function" && cb(res.data)
    } else {
      return typeof cb == "function" && cb(false)
    }
  });
}
//参与打卡
function sign(data, cb) {
  var app = getApp()
  app.func.req('c=index&a=sign', {openid:data.openid,aid:data.aid}, function (res) {
    //console.log(res)
    return typeof cb == "function" && cb(res.data)
  })
}

//获取课程
function getLesson(cb) {
  var app = getApp()
  app.func.req('c=index&a=getLesson', { }, function (res) {
    //console.log(res)
    return typeof cb == "function" && cb(res.data)
  })
}

//获取按钮
function showBtn(cb) {
  var app = getApp()
  app.func.req('c=index&a=showBtn', {}, function (res) {
    //console.log(res)
    return typeof cb == "function" && cb(res.data)
  })
}

//弹窗
function showMo (t, i) {
    wx.showModal({
      title: t,
      content: i,
      cancelText: "取消",//默认是“取消”
      confirmText: "确定",//默认是“确定”
      confirmColor: '#ffe300',//确定文字的颜色
    })

}
//获取礼品列表
function getGift(cb) {
  var app = getApp()
  app.func.req('c=index&a=getGiftList', {}, function (res) {
    //console.log(res)
    return typeof cb == "function" && cb(res.data)
  })
}

module.exports = {
  req: req,
  o_req: o_req,
  getWxUerinfo: getWxUerinfo,
  getLocation: getLocation,
  getMembersInfos: getMembersInfos,
  sign:sign,
  getLesson: getLesson,
  showBtn: showBtn,
  showMo:showMo,
  getGift: getGift,
}  
