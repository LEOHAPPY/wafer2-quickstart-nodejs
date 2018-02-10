var qcloud = require('../../vendor/wafer2-client-sdk/index');
var config = require('../../config');
var util = require('../../utils/util.js');
var that;

var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var enterCounter = 0;

Page({
  data: {
    _userInfo: {},

    personList: [],
    personListBoy: [],
    personListGirl: [],
    personDtl: [],
    dateNow: 0,

    //navbar
    tabs: ["男生", "女生"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },

  onLoad: function (options) {
    that = this;
    that.initialData();
    that.setTabData();
  },

  onShow: function () {
    enterCounter++;

    if (enterCounter == 1) {
      util.showBusy('')
      getAllPerson();
      util.showBusy('')
    } else {
      getAllPerson();
    }
    // getByIDPerson(102)
  },

  initialData() {
    wx.getStorage({
      key: '_userInfo',
      success: function (res) {
        console.log(res.data)
        if (res.data.gender == "男") {
          that.setData({
            activeIndex: 1,
          })
          that.setTabData()
        }
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })

    //calculate this getFullYear
    var d = new Date();
    var n = d.getFullYear() - 1 - 1993;
    console.log(n)
    that.setData({
      dateNow: n,
    })
  },

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    console.log(that.data.activeIndex)
  },

  setTabData: function () {
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });

    //todo 
    //get user info if gender == "nan" => activeIndex == 0 else => ==1
  },

  openPerson: function (e) {
    console.log('open person clikced', e)
    let dataTransfer;
    if (that.data.activeIndex == 0) {
      dataTransfer = that.data.personListBoy[e.currentTarget.id]
    }
    else if (that.data.activeIndex == 1) {
      dataTransfer = that.data.personListGirl[e.currentTarget.id]
    }
    console.log('dataTransfer', dataTransfer)
    wx.navigateTo({
      url: '../personDtl/personDtl?dataPersonDtl=' + JSON.stringify(dataTransfer)
    })
  }
})

function getAllPerson() {
  // util.showBusy('');
  wx.request({
    url: config.service.getAllPerson,
    method: 'get',
    success(result) {
      console.log('get personlist', result.data);
      that.setData({
        // personList: result.data.personInfo,
        personListBoy: result.data.personInfo.filter(x => x.gender == "男"),
        personListGirl: result.data.personInfo.filter(x => x.gender == "女")
      });
      // console.log('that.personList', that.data.personList);
      console.log('that.personListBoy', that.data.personListBoy);
      console.log('that.personListGirl', that.data.personListGirl);

      if (enterCounter == 1) util.showSuccess('');
    },
    fail(error) {
      // util.showModel('请求失败',error);
      console.error('request fail', error);
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
