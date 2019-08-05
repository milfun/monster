
/* 
* 获取热门职位
*/
function getHotJobs(cb) {
  var app = getApp()
  app.func.req('c=WxPublic&a=index_hotword', {}, function (res) {
    return typeof cb == "function" && cb(res.data)
  })
}
/* 
* 获取推荐职位
*/
function getIndexJobs(jobstype , recommend, cb) {
  var app = getApp()
  if (recommend) {
    //console.log(recommend)
    app.func.getWxUerinfo(function (res) {
    //console.log(res)
      app.func.o_req('c=WxPersonal&a=recommendjobs', { openid: res.openid }, function (res) {
        if (res.status == 1) {
          return typeof cb == "function" && cb(res.data)
        } else {
          getIndexJobs(jobstype , false, function (newjobs) {
            return typeof cb == "function" && cb(newjobs)
          })
        }

      })
    })
  } else {
    //app.func.getLocation()
    if (jobstype == 'nearby') {
      var lat = 0
      var lng = 0
      wx.getLocation({
        success: function (res) {
          var app = getApp()
          lat = app.location.latitude = res.latitude
          lng = app.location.longitude = res.longitude
          app.func.req('c=WxPublic&a=index_jobslist', { 'jobstype': jobstype, latitude: lat, longitude: lng }, function (res) {
            return typeof cb == "function" && cb(res.data)
          })
        }
      })
    } else {
		app.func.req('c=WxPublic&a=index_jobsList', { 'jobstype': jobstype }, function (res) {
			return typeof cb == "function" && cb(res.data)
		})
    }
  }

  // app.func.req('c=WxPublic&a=index_jobsList', {}, function (res) {
  //   return typeof cb == "function" && cb(res.data)
  // })
}
/* 
* 获取推荐职位
*/
function getIndexCompany(cb) {
  var app = getApp()
  app.func.req('c=WxPublic&a=index_companylist', {}, function (res) {
    return typeof cb == "function" && cb(res.data)
  })
}
/* 
* 获取职位列表
*/
function getJobsList(key, page, cb) {
  var app = getApp()
  if (app.jobsListWhere.near == 1) {
    //console.log(app.jobsListWhere.near)
					//console.log(app.location.latitude)
					//console.log(app.location.longitude)
    var lat = app.location.latitude
    var lng = app.location.longitude
    if (lat != 0 && lng != 0) {
    app.func.req('c=WxPublic&a=jobsshow', { key: key, latitude: lat, longitude: lng, range: 3, page: page }, function (res) {
      return typeof cb == "function" && cb(res.data)
    })
    } else {
      wx.getLocation({
        success: function (res) {
          var app = getApp()
          lat = app.location.latitude = res.latitude
          lng = app.location.longitude = res.longitude
          app.func.req('c=WxPublic&a=jobslist', { key: key, latitude: lat, longitude: lng, range: 3, page: page }, function (res) {
            return typeof cb == "function" && cb(res.data)
          })
        }
      })
    }
  } else {
    var allowance = 0
    if (app.jobsListWhere.allowance == 1) {
      allowance = 1
    }
    app.func.req('c=WxPublic&a=jobslist', { key: key, allowance: allowance, page: page }, function (res) {
      return typeof cb == "function" && cb(res.data)
    })
  }

}
/* 
* 获取职位详情
*/
function getJobsInfo(id, cb) {
  var app = getApp()
  if (app.globalData.membersInfo!=null){
    app.func.req('c=WxPublic&a=jobsshow', { id: id, uid: app.globalData.membersInfo.uid }, function (res) {
      return typeof cb == "function" && cb(res.data)
    })
  }else{
    app.func.req('c=WxPublic&a=jobsshow', { id: id }, function (res) {
      return typeof cb == "function" && cb(res.data)
    })
  }
  
}
/* 
* 获取企业列表
*/
function getCompanyInfo(id, cb) {
  var app = getApp()
  app.func.req('c=WxPublic&a=companyshow', { id: id, uid: app.globalData.membersInfo.uid  }, function (res) {
    return typeof cb == "function" && cb(res.data)
  })
}

/*
* 收藏职位
*/
function favoriteJobs(id,cb) {
  var app = getApp()
  app.func.getMembersInfo('',function(members){
    app.func.o_req('c=WxPersonal&a=jobs_favorites', { jid: id }, function (res) {
      return typeof cb == "function" && cb(res)
    })
  })
}
/*
* 收藏职位
*/
function del_favoriteJobs(id, cb) {
  var app = getApp()
  app.func.getMembersInfo('', function (members) {
    app.func.o_req('c=WxPersonal&a=del_jobs_favorites', { jid: id }, function (res) {
      return typeof cb == "function" && cb(res)
    })
  })
}
/*
* 投递职位
*/
function applyJobs(id, cb) {
  var app = getApp()
  app.func.getMembersInfo('', function (members) {
    app.func.o_req('c=WxPersonal&a=resume_apply', { jid: id }, function (res) {
      return typeof cb == "function" && cb(res)
    })
  })
}
function allowanceCheck(id, cb) {
  var app = getApp()
  app.func.getMembersInfo('', function (members) {
    app.func.o_req('c=WxPersonal&a=apply_allowance', { jid: id }, function (res) {
      return typeof cb == "function" && cb(res)
    })
  })
}

function allowanceSave(id, cb) {
  var app = getApp()
  app.func.getMembersInfo('', function (members) {
    app.func.o_req('c=WxPersonal&a=apply_allowance_save', { jid: id }, function (res) {
      return typeof cb == "function" && cb(res)
    })
  })
}
/* 
* 获取职位列表
*/
function getCompanyList(key, page, cb) {
  var app = getApp()
    app.func.req('c=WxPublic&a=companylist', { key: key, page: page }, function (res) {
      return typeof cb == "function" && cb(res.data)
    })
}
module.exports = {
  getHotJobs: getHotJobs,
  getIndexJobs: getIndexJobs,
  getIndexCompany: getIndexCompany,
  getJobsList: getJobsList,
  getJobsInfo: getJobsInfo,
  getCompanyInfo: getCompanyInfo,
  getCompanyList: getCompanyList,
  favoriteJobs: favoriteJobs,
  applyJobs: applyJobs,
  allowanceCheck: allowanceCheck,
  allowanceSave: allowanceSave,
  del_favoriteJobs: del_favoriteJobs,
}  