// pages/douban/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      searchInpuFocus: true,
      searchWords: "",
      wordsList: [],
      size: 20,
      page: 1,
      movies: [],
      requestInternal: -1,
  },

  onTapSearchBtn: function()
  {
      console.log("words", this.data.searchWords)

      if (this.data.searchWords != "")
      {
          this.retrieve()
      }

      this.setData({
          searchInputFocus: false,
          searchWords: "",
          wordsList: [],
      })
  },

  retrieve: function()
  {
      let app = getApp()
      let start = (this.data.page - 1) * this.data.size
      wx.showLoading({
          title: '加载中',
      })

      return app.request(`https://douban.uieee.com/v2/movie/search?q=${this.data.searchWords}&start=${start}&count=${this.data.size}`).then(res=>{
          console.log("res", res)
          if (res.subjects.length > 0)
          {
              let movies = this.data.movies.concat(res.subjects)
              let total = Math.floor(res.total / this.data.size)
              this.setData({
                  movies: movies,
                  total: total,
                  page: this.data.page,
                  wordsList: [],
              })
              wx.setNavigationBarTitle({
                  title: res.title,
                  success: function(res) {},
                  fail: function(res) {},
                  complete: function(res) {},
              })
          }
      }).catch(err=>{
          console.log(err)
      }).finally(()=>{
          wx.hideLoading()
      })
  },

  showSearchInput: function()
  {
      this.setData({
          searchInputFocus: true,
      })
  },

  clearSearchInput: function()
  {
      this.setData({
          searchWords: "",
          wordsList:[],
      })
  },

  onSearchInputType: function(e)
  {
      let app = getApp()
      let words = e.detail.value
      this.setData({
          searchWords: words,
      })

      clearTimeout(this.data.requestInterna)
      this.data.requestInternal = setTimeout(()=>{
          app.request(`https://douban.uieee.com/v2/movie/search?q=${words}&start=0&count=6`).then(
              d=>{
                  console.log(d)
                  if (d.subjects.length > 0)
                  {
                      this.setData({
                          wordsList: d.subjects,
                      })
                  }
              }
          )
      }, 2000)
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