// pages/page3/login/login.js
import Toast from '../../../dist/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tel: '17366186521',
    password: '123456',
  },
  bintInput: function(e) {
    const item = e.currentTarget.dataset.item
    this.data[item] = e.detail.value
  },
  toRegisterPage: function () {
    wx.redirectTo({
      url: '/pages/page3/register/register',
    })
  },

  login: function () {
    console.log("login start")
    if(this.data.tel == '') {
      Toast("请输入手机号码")
      return
    }
    if(this.data.password == '') {
      Toast("请输入密码")
      return
    }
    const _this = this
    wx.request({
      url: 'http://192.168.247.135:8082/auth-center/oauth/token?grant_type=password&username=' + _this.data.tel + '&password=' + _this.data.password + '&scope=all',
      method: 'POST',
      header: {'Authorization': 'Basic c3lzLWJhc2UtZGF0YTp1c2VyLXNlY3JldC04ODg4'},
      // auth: {
      //   username: 'sys-base-data',
      //   password: 'user-secret-8888'
      // },
      success: function(res) {
        getApp().globalData.oauthAccessToken = res.data.token_type + " " + res.data.access_token
        try {
          wx.setStorageSync('tel', _this.data.tel)
        } catch (e) {
          console.log("存储本地tel异常")
          console.log(e)
        }
        //跳转“我的”页面
        wx.redirectTo({
          url: '/pages/index/index?PageCur=page3',
        })
      }
    })
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