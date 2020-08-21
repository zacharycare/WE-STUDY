// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    PageCur: 'page1'
  },
  NavChange(e) {
    // if(e.currentTarget.dataset.cur == "page3" && getApp().globalData.oauthAccessToken == null) {
    //   wx.navigateTo({
    //     url: '/pages/page3/register/register',
    //   })
    // } else {
      this.setData({
        PageCur: e.currentTarget.dataset.cur
      })
    // }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.PageCur) {
      this.setData({
        PageCur: options.PageCur
      })
    }
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
    return {
      title: 'ColorUI-高颜值的小程序UI组件库',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index'
    }
  }
})