// pages/tuijian/tuijian.js
var app = getApp();
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var user = require('../../../utils/user.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [],
    video: [],
  },
  // 提交表单
  save (e) {
    console.log(e);
    console.log(this.data.imgList)
    util.request(api.ForumAdd, {
      context: e.detail.value.content,
      title: e.detail.value.title,
      picUrls: this.data.imgList.join(",")
    }, 'POST').then(function (res) {
      console.log(res)
      if (res.errno === 200) {
        wx.showToast({
          title: '发布成功',
        })
        setTimeout(function () {
          wx.reLaunch({
            url: '../../index/index',
          })
        }, 2000)
      } else {
        wx.showToast({
          title: '发布失败',
        })
      }

    });
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
  DelVideo (e) {
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
  ChooseImage () {
    var that = this
    wx.chooseImage({
      count: 9, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      // sourceType: ['album'], //从相册选择
      success: (res) => {
        //上传文件的接口
        console.log(res)
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          wx.uploadFile({
            url: api.UploadFile, //仅为示例，并非真实的接口地址
            method: 'post',
            filePath: res.tempFilePaths[i],
            header: {
              'X-Litemall-Token': wx.getStorageSync('token')
            },
            name: 'file',
            success (res) {
              let imgRes = JSON.parse(res.data)
              that.data.imgList.push(imgRes.data.url)
              if (imgRes.errno === 0) {
                that.setData({
                  imgList: that.data.imgList
                })
              }
            }
          })
        }
      }
    });
  },
  ViewImage (e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg (e) {
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