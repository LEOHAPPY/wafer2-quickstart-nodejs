var qcloud = require('../../vendor/wafer2-client-sdk/index');
var config = require('../../config');
var util = require('../../utils/util.js');
var that;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    personObj:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    let dataPersonDtl = JSON.parse(options.dataPersonDtl)
    that.setData({
      personObj: dataPersonDtl
    })
    console.log('that.data.personDtl', that.data.personObj)
  },

  toHongNiangPage: function(){
    console.log('toHongNiangPage')
    
    wx.switchTab({
      url: '../hongNiang/hongNiang',
    })
  }

})