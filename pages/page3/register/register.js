// pages/page3/register/register.js
import Toast from '../../../dist/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: '',
    tel: '',
    smsCode: '',
    password: '',
    smsCodeDisabled: true
  },

  bintInput: function(e) {
    console.log(e)
    const item = e.currentTarget.dataset.item
    this.data[item] = e.detail.value
  },

  getSmsCode: function () {
    if(this.data.tel == '') {
      Toast("请输入手机号码")
      return
    }
    console.log("获取验证码")
  },

  sendSmsValidateCode: function() {
    console.log(this.data)
    if(this.data.tel == '') {
      Toast("请输入手机号码")
      return
    }
    this.setData({
      smsCodeDisabled: !this.data.smsCodeDisabled
    })
    const countDown = this.selectComponent('.control-count-down');
    countDown.reset();
    countDown.start();

    const _this = this;
    console.log(_this.data.tel)
    wx.request({
      url: 'http://192.168.247.135:8082/sys-base-data/login/getSmsValidCode',
      method: 'POST',
      // header: {'Authorization': app.globalData.access_token},
      data: {'tel': _this.data.tel},
      success: function(res) {
        console.log(res)
        Toast(res.data.data)
      }
    })
  },

  finished: function() {
    this.setData({
      smsCodeDisabled: !this.data.smsCodeDisabled
    })
  },

  register: function () {
    const _this = this;
    wx.request({
      url: 'http://192.168.247.135:8082/sys-base-data/login/register',
      method: 'POST',
      // header: {'Authorization': app.globalData.access_token},
      data: {'tel': this.data.tel,'code': this.data.smsCode,'password': this.data.password,'nickName': this.data.nickName},
      success: function(res) {
        if(res.data.code == "000000") {
          //获取oauth token
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
        } else {
          Toast(res.data.message)
        }
      }
    })
  },

  toLoginPage: function () {
    wx.redirectTo({
      url: '/pages/page3/login/login',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

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