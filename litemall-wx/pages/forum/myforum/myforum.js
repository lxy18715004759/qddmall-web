// pages/forum/forum.js
var app = getApp();
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var user = require('../../../utils/user.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft: 0,
    MyForumList: '',//我的帖子
    MyForumReplay: '',//我的回复
    NewMsgCount: ''//新增回复数
  },
  goMessage () {
    wx.navigateTo({
      url: '../../message/message',
    })
  },
  goForum () {
    wx.redirectTo({
      url: '../forum',
    })
  },
  //切换nav
  tabSelect (e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  goPost () {
    wx.navigateTo({
      url: '../post/post',
    })
  },
  goDetails (e) {
    wx.navigateTo({
      url: '../forumDetails/forumDetails?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    util.request(api.GetMyPage).then(function (res) {
      console.log(res)
      that.setData({
        MyForumList: res.data.list
      });
    });
    util.request(api.GetForumReplay).then(function (res) {
      console.log(res)
      that.setData({
        MyForumReplay: res.data.list
      });
    });
    util.request(api.GetNewMsgCount).then(function (res) {
      console.log(res)
      that.setData({
        NewMsgCount: res.data
      });
    });
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