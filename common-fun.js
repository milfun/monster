/************服务器调试***********/
var rootDocment = 'https://milfun.fun/m/api/index.php?m=Home&'
var secretKey = 'MilFuns'
/****************使用请打开详情里面：https检测*************** */

/************本地调试***********
var rootDocment = 'http://localhost/74cms/index.php?m=Weixinapp&'
var secretKey = 'MilFun'*/
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
      app.func.req('c=WxPublic&a=getWxUerinfo', { 'code': loginCode.code }, function (res) {
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


module.exports = {
  req: req,
  o_req: o_req,

}  