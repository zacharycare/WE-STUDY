// pages/page3/home/home.js
const app = getApp();
const api = require('../../../utils/api.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    nickName: '',
    personInfo: {}
  },
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的方法列表
   */
  methods: {
    feedBack: function() {
      console.log("建议与反馈")
    }
  },
  attached: function () {
    console.log("attached...")
    const _this = this
    var tel = wx.getStorageSync('tel')
    console.log("本地存储的手机号：" + tel)
    //此处获取用户信息
    api.request({
      url: '/sys-base-data/getPersonInfo',
      method: 'POST',
      data: {'username': tel},
      success: (res) => {
        _this.setData({
          nickName: res.data.data.nickName || res.data.data.tel,
          personInfo: res.data.data
        })
        console.log(_this.data.personInfo)
      }
    })
  }
})
