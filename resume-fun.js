
/* 
* 获取简历列表
*/
function getResumesList(key, page, cb) {
  var app = getApp()
  app.func.req('c=WxPublic&a=resumeslist', { key: key, page: page }, function (res) {
	return typeof cb == "function" && cb(res.data)
  })
}
/* 
* 获取简历详情
*/
function getResumesInfo(id, cb) {
  var app = getApp()
  if (app.globalData.membersInfo!=null){
    app.func.req('c=WxPublic&a=resumeshow', { id: id, uid: app.globalData.membersInfo.uid }, function (res) {
      return typeof cb == "function" && cb(res.data)
    })
  }else{
    app.func.req('c=WxPublic&a=resumeshow', { id: id }, function (res) {
      return typeof cb == "function" && cb(res.data)
    })
  }
}
/*
* 收藏简历
*/
function favoriteResumes(id,cb) {
  var app = getApp()
  app.func.getMembersInfo('',function(members){
    app.func.o_req('c=WxCompany&a=resume_favorites', { rid: id }, function (res) {
      return typeof cb == "function" && cb(res)
    })
  })
}
/*
* 删除收藏简历
*/
function del_favoriteResumes(id, cb) {
  var app = getApp()
  app.func.getMembersInfo('', function (members) {
    app.func.o_req('c=WxCompany&a=del_resume_favorites', { rid: id }, function (res) {
      return typeof cb == "function" && cb(res)
    })
  })
}
/*
* 下载简历
*/
function resume_down_confirm(id, cb) {
  var app = getApp()
  app.func.getMembersInfo('', function (members) {
    app.func.o_req('c=WxCompany&a=resume_down_confirm', { rid: id }, function (res) {
      return typeof cb == "function" && cb(res)
    })
  })
}
/*
* 下载简历
*/
function resume_down(id, cb) {
  var app = getApp()
  app.func.getMembersInfo('', function (members) {
    app.func.o_req('c=WxCompany&a=resume_down', { rid: id }, function (res) {
      return typeof cb == "function" && cb(res)
    })
  })
}
/*
* 删除收藏简历
*/
function del_downResumes(id, cb) {
  var app = getApp()
  app.func.getMembersInfo('', function (members) {
    app.func.o_req('c=WxCompany&a=del_downResumes', { rid: id }, function (res) {
      return typeof cb == "function" && cb(res)
    })
  })
}
/*
* 删除收藏简历
*/
function del_jobsApply(id, cb) {
  var app = getApp()
  app.func.getMembersInfo('', function (members) {
    app.func.o_req('c=WxCompany&a=del_jobsApply', { y_id: id }, function (res) {
      return typeof cb == "function" && cb(res)
    })
  })
}
module.exports = {
  getResumesList: getResumesList,
  getResumesInfo: getResumesInfo,
  favoriteResumes: favoriteResumes,
  resume_down_confirm: resume_down_confirm,
  resume_down: resume_down,
  del_favoriteResumes: del_favoriteResumes,
  del_downResumes: del_downResumes,
  del_jobsApply: del_jobsApply,
}  