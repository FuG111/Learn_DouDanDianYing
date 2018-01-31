// pages/douban/splash.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      subjects: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this
    //1、
    //   let app = getApp()
    //   app.request("https://douban.uieee.com/v2/movie/coming_soon?start=0&count=20").then(
    //       data => this.setData({ subjects: data.subjects }))
    //2、
      wx.request({
          url: "https://douban.uieee.com/v2/movie/coming_soon?start=0&count=20",
          data: {},
          header: {
              "Content-Type": "json",
          },
          success: function (res) {
              var data = res.data
              that.setData({
                subjects : data.subjects
              })
          },
      })
      
      //缓存本地数据
      wx.setStorage({
          key: 'has_shown_splash',
          data: 'true',
      })
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