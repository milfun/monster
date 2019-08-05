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

function o_upload(url, filePath, name, cb) {
  var app = getApp()
  
  wx.uploadFile({
    // url: app.globalData.rootDocment+"c=WxPersonal&a=uploadPhoto",
   
    url: rootDocment + url + "&secretKey=" + secretKey + "&openid=" + app.globalData.openid,
    filePath: filePath,
    name: name,
    header: { "Content-Type": "multipart/form-data" },
   
    success: function (res) {
     
      return cb(res)
    },
    fail: function (e) {
     
     // return typeof cb == "function" && cb({'status':'2'})
    },
    complete: function () {
     // wx.hideToast();  //隐藏Toast
     // return typeof cb == "function" && cb({ 'status': '3' })
    }
  })
}

/* 
* 获取网站配置信息
*/
function getSiteConfig(cb) {
  var app = getApp()
  app.func.req('c=WxPublic&a=web_cfg', {}, function (res) {
    if (wx.setNavigationBarColor) {
      wx.setNavigationBarColor({
        frontColor: res.data.fontColor,
        backgroundColor: res.data.backgroundColor,
      })
    }
    app.qscms = res.data
    wx.setStorageSync('qscms', res.data)
    return typeof cb == "function" && cb(res.data)
  })
}
/* 
* 获取网站配置信息
*/
function setNaviColor() {
  var app = getApp()
  var qscms = wx.getStorageSync('qscms')
  if(qscms!=null){
    if (wx.setNavigationBarColor) {
      wx.setNavigationBarColor({
        frontColor: qscms.fontColor,
        backgroundColor: qscms.backgroundColor,
      })
    }
  }else{
    getSiteConfig(function(res){
      wx.setStorageSync('qscms', res.data)
      setNaviColor()
    })
  }
  
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
function getMembersInfos(cb) {
  var app = getApp()
  var membersInfo = app.globalData.membersInfo
    app.func.o_req('c=WxPersonal&a=getUserInfo', {}, function (res) {
      if (res.status == 1) {
        app.globalData.membersInfo = res.data
        return typeof cb == "function" && cb(res.data)
      } else {
        return typeof cb == "function" && cb(false)
      }
    });
}
function getMembersInfo( JUrl ,cb){
  var app = getApp() 
  var membersInfo = app.globalData.membersInfo
    app.func.o_req('c=WxPersonal&a=getUserInfo', {}, function (res) {
 
        app.globalData.membersInfo = res.data
        return typeof cb == "function" && cb(res.data)
 
    });
}
function getcompanyProfile( JUrl ,cb){
  var app = getApp() 
    app.func.o_req('c=WxCompany&a=companyProfile', {}, function (res) {
        app.globalData.companyProfile = res.data
        return typeof cb == "function" && cb(res.data)
 
    });
}
module.exports = {
  req: req,
  o_req: o_req,
  o_upload: o_upload,
  getSiteConfig: getSiteConfig,
  setNaviColor: setNaviColor,
  getWxUerinfo: getWxUerinfo,
  getLocation: getLocation,
  getMembersInfo: getMembersInfo,
  getMembersInfos: getMembersInfos,
  getcompanyProfile: getcompanyProfile,
}  