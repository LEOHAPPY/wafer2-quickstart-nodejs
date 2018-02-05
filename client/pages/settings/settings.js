var qcloud = require('../../vendor/wafer2-client-sdk/index');
var config = require('../../config');
var util = require('../../utils/util.js');
var that;

Page({
  data: {
    genderArray: ['女', '男'],
    date: '1990-01-01',
    region: ['湖南省', '邵阳县', '邵东县'],
    degreeLevel: ['小学', '初中', '高中', '本科', '硕士', '博士'],
    brothers: ['无（独生）', '老大', '老二', '老三', '老四', '老五', '老六'],
    requestResult: '',

    userInfo: {},
    logged: false,
    takeSession: false,
    userAppID: '-1',
    personObj: {}
  },

  onLoad: function (options) {
    that = this;
    // that.login();
    that.checkAppID();
    that.login();
    //if 
  },

  gotoList() {
    wx.switchTab({
      url: '../personList/personList'
    })
    console.log("go to list page")
  },

  onShow: function () {
  },

  checkAppID() {
    //get personObj first, then userAppID

    wx.getStorage({
      key: 'personDtl',
      success: function (res) {
        console.log(res.data);
        that.setData({
          personObj: res.data
        });
        console.log('that.personObj', that.data.personObj)
      },
    });

    wx.getStorage({
      key: 'userAppID',
      success: function (res) {
        console.log(res.data);
        that.setData({
          userAppID: res.data
        });
        console.log('that.userAppID', that.data.userAppID)
      },
    });
  },

  formSubmit: function (event) {
    console.log('that.userAppID', that.data.userAppID)
    if (that.data.userAppID < 0) {
      console.log('event.detail.value', event.detail.value);
      //stringify and remove ["","",""] first and last for region and replace all  "
      event.detail.value.hometown = JSON.stringify(event.detail.value.hometown).substr(1).slice(0, -1).replace(/\"/g, "");

      var personObject = event.detail.value;
      personObject.userInfo = JSON.stringify(that.data.userInfo);
      personObject.openID = that.data.userInfo.openId;
      console.log('personObj', personObject);

      addPersonInfo(personObject);
    } else {
      //trim id
      event.detail.value.id = event.detail.value.id.trim();
      console.log('event.detail.value', event.detail.value);
      var personObject = event.detail.value;
      personObject.userInfo = JSON.stringify(that.data.userInfo);
      personObject.openID = that.data.userInfo.openId;
      console.log('personObj update', personObject);

      updatePersonInfo(personObject);
    }

  },

  formReset: function () {
    console.log('form发生了reset事件')
  },


  bindBrothersPickerChange: function (e) {
    console.log('bindBrothersPickerChange picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      bIndex: e.detail.value
    })
  },

  bindGenderPickerChange: function (e) {
    console.log('gender picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      gIndex: e.detail.value
    })
  },

  bindDegreeLevelPickerChange: function (e) {
    console.log('degreeLevel picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      dIndex: e.detail.value
    })
  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', JSON.stringify(e.detail.value))
    console.log('picker发送选择改变，携带值为', JSON.parse(JSON.stringify(e.detail.value)))

    this.setData({
      region: e.detail.value
    })
  },

  login: function () {
    if (this.data.logged) return

    util.showBusy('正在登录')

    // 调用登录接口
    qcloud.login({
      success(result) {
        if (result) {
          util.showSuccess('登录成功')
          that.setData({
            userInfo: result,
            logged: true
          })
        } else {
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          qcloud.request({
            url: config.service.requestUrl,
            login: true,
            success(result) {
              util.showSuccess('登录成功')
              that.setData({
                userInfo: result.data.data,
                logged: true
              })
              console.log('that.data.userInfo',that.data.userInfo)
              getByOpenIDPerson(that.data.userInfo.openId);
            },

            fail(error) {
              util.showModel('请求失败', error)
              console.log('request fail', error)
            }
          })
        }

        
      },

      fail(error) {
        util.showModel('登录失败', error)
        console.log('登录失败', error)
      }
    })
  },

  // 切换是否带有登录态
  switchRequestMode: function (e) {
    this.setData({
      takeSession: e.detail.value
    })
    this.doRequest()
  },

  doRequest: function () {
    util.showBusy('请求中...')
    var that = this
    var options = {
      url: config.service.requestUrl,
      login: true,
      success(result) {
        util.showSuccess('请求成功完成')
        console.log('request success', result)
        that.setData({
          requestResult: JSON.stringify(result.data)
        })
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    }
    if (this.data.takeSession) {  // 使用 qcloud.request 带登录态登录
      qcloud.request(options)
    } else {    // 使用 wx.request 则不带登录态
      wx.request(options)
    }
  },

});

function updatePersonInfo(objectPerson) {
  util.showBusy('')
  wx.request({
    url: config.service.updatePerson,
    method: "POST",
    data: { personDtl: objectPerson },
    header: {
      'content-type': 'application/json'
    },
    success(result) {
      console.log('result.data', result.data)

      wx.pageScrollTo({
        scrollTop: 0
      })
      util.showSuccess('')

      wx.setStorage({
        key: 'personDtl',
        data: objectPerson,
      })

      that.setData({
        personObj: objectPerson
      })

    },
    fail(error) {
      util.showModel('请求失败', error);
      console.log('request fail', error);
    }
  })
}

function addPersonInfo(objectPerson) {

  util.showBusy('')
  wx.request({
    url: config.service.addPerson,
    method: "POST",
    data: { personDtl: objectPerson },
    header: {
      'content-type': 'application/json'
    },
    success(result) {
      console.log('result.data', result.data)
      wx.pageScrollTo({
        scrollTop: 0
      })
      util.showSuccess('编号' + result.data.id)
      wx.setStorage({
        key: 'userAppID',
        data: result.data.id,
      })
      wx.setStorage({
        key: 'personDtl',
        data: objectPerson,
      })
      that.setData({
        requestResult: result.data,
        userAppID: result.data.id,
        personObj: objectPerson
      })
    },
    fail(error) {
      util.showModel('请求失败', error);
      console.log('request fail', error);
    }
  })
}

function getByOpenIDPerson(id) {
  
  // util.showBusy('');
  wx.request({
    url: config.service.getByOpenIDPerson + id,
    method: 'get',
    success(result) {
      console.log('get personDtl', result.data);
      that.setData({
        personDtl: result.data.personInfo,
        userAppID: result.data.personInfo[0].id,
        personObj: result.data.personInfo[0]
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
