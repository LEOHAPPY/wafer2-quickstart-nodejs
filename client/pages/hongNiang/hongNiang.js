

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagList: [
      "../../image/QRCode.png",
      "../../image/QRCode.png"
    ]
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

  previewImg1: function(e){
    var current=e.target.dataset.src
    console.log(current)
    wx.previewImage({
      current: current,
      urls: "../../image/QRCode.png"
    })
  }

})