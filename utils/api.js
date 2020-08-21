const serverHost = 'http://192.168.247.135:8082'
const request = function (params) {
  wx.request({
    url: serverHost + params.url || '',
    data: params.data || {},
    method: params.method || 'GET',
    header: {'Authorization': getApp().globalData.oauthAccessToken},
    success: (res) => {
      if(res.statusCode == 401 && res.data.error == 'unauthorized') {
        //未授权，跳转登录页面
        wx.navigateTo({
          url: '/pages/page3/login/login',
        })
      } else {
        params.success && params.success(res)
      }
    },
    fail: (res) => {
      params.fail && params.fail(res)
    },
    complete: (res) => {
      params.complete && params.complete(res)
    }
  })
}

module.exports = {
  request
}