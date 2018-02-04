var qcloud = require('../../vendor/wafer2-client-sdk/index');
var config = require('../../config');
var util = require('../../utils/util.js');
var that;

Page({
  data: {
    personList: [],
    personDtl: []
  },

  onLoad: function (options) {
    that = this;
    //load all the person information and list down 
    // getAllPerson();
    // getByIDPerson(102)
  },

  onShow: function () {
    getAllPerson();
    getByIDPerson(102)
  },

  openPerson: function(e){
    console.log('open person clikced',e)
    let dataPersonDtl = that.data.personList[e.currentTarget.id];
    console.log('dataPersonDtl', dataPersonDtl)
    wx.navigateTo({
      url: '../personDtl/personDtl?dataPersonDtl=' +  JSON.stringify(dataPersonDtl)
    })
  }


})

function getAllPerson(){
  // util.showBusy('');
  wx.request({
    url: config.service.getAllPerson,
    method: 'get',
    success(result){
      console.log('get personlist',result.data);
      that.setData({
        personList : result.data.personInfo
      });
      console.log('that.personList',that.data.personList);
      // util.showSuccess('');
    },
    fail(error){
      // util.showModel('请求失败',error);
      console.error('request fail',error);
    }
  });
}

function getByIDPerson(id) {
  
  // util.showBusy('');
  wx.request({
    url: config.service.getByIDPerson + id,
    method: 'get',
    success(result) {
      console.log('get personDtl', result.data);
      that.setData({
        personDtl: result.data.personInfo
      });
      console.log('that.personDtl', that.data.personDtl);
      // util.showSuccess('');
    },
    fail(error) {
      // util.showModel('请求失败', error);
      console.error('request fail', error);
    }
  });
}