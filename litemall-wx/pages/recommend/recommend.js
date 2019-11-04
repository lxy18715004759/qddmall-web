// pages/tuijian/tuijian.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['浙江省', '杭州市', '西湖区'],
    imgList: [],
    imgList1: [],
    video:[],
  },
  goForum(){
    wx.navigateTo({
      url: '../forum/forum',
    })
  },
  goMessage(){
    wx.navigateTo({
      url: '../message/message',
    })
  },
  // 提交表单
  save(e){
    console.log(e);
  },
  // 选择地址
  RegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  // 选择视频
  chooseVideo: function () {
    var that = this
    wx.chooseVideo({
      success: function (res) {
        that.setData({
          video: res.tempFilePath,
        })
      }
    })
  },
  // 删除视频
  DelVideo(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除上传的视频吗？',
      cancelText: '取消',
      confirmText: '删除',
      success: res => {
        if (res.confirm) {
          this.setData({
            video: []
          })
        }
      }
    })
  },
  // 上传图片
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      // sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除上传的图片吗？',
      cancelText: '取消',
      confirmText: '删除',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  // 上传商品条形码
  ChooseImage1() {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      // sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList1.length != 0) {
          this.setData({
            imgList1: this.data.imgList1.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList1: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage1(e) {
    wx.previewImage({
      urls: this.data.imgList1,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg1(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除上传的图片吗？',
      cancelText: '取消',
      confirmText: '删除',
      success: res => {
        if (res.confirm) {
          this.data.imgList1.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList1: this.data.imgList1
          })
        }
      }
    })
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