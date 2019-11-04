// pages/forum/forumDetails/forumDetails.js
var app = getApp();
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var user = require('../../../utils/user.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    forumDetail: '',//帖子详情
    picUrls: '',//图片列表
    forumReplay: '',//回复列表
    id: '',//论坛id
    focus: false,//是否输入
    content: "",//输入内容
    curPage: 1,// 查询页数
  },
  // 点赞
  good () {
    var that = this
    util.request(api.ForumLike, { forumId: that.data.id }).then(function (res) {
      console.log(res)
      util.request(api.ForumDetail, { id: that.data.id }).then(function (res) {
        that.setData({
          forumDetail: res.data
        });
      });
    });
  },
  //获取回复框的值
  content (e) {
    this.setData({
      content: e.detail.value
    })
  },
  //点击回复按钮
  reply () {
    console.log("回复")
    this.setData({
      focus: true
    })
  },
  //回复
  replyContent () {
    var that = this
    util.request(api.ReplayAdd, {
      replayText: that.data.content,
      forumId: that.data.id
    }, 'POST').then(function (res) {
      console.log(res)
      if (res.errno === 200) {
        wx.showToast({
          title: '回复成功',
        })
        that.setData({
          content: null,
          focus: false
        })
        util.request(api.ForumReplay, { forumId: that.data.id }).then(function (res) {
          that.setData({
            forumReplay: res.data.list,
          });
        });
        util.request(api.ForumDetail, { id: that.data.id }).then(function (res) {
          that.setData({
            forumDetail: res.data
          });
        });
      } else {
        wx.showToast({
          title: '回复失败',
        })
      }

    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    that.setData({
      id: options.id
    })
    util.request(api.ForumDetail, { id: options.id }).then(function (res) {
      console.log(res)
      let picUrls = res.data.picUrls
      picUrls = picUrls.replace(/\"/g, "").replace(/\[/g, "").replace(/\]/g, "")
      picUrls = picUrls.split(',')
      that.setData({
        forumDetail: res.data,
        picUrls: picUrls
      });
    });
    util.request(api.ForumReplay, {
      forumId: options.id,
      limit: 5,
      page: 1
    }).then(function (res) {
      console.log(res)
      that.setData({
        forumReplay: res.data.list,
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
    this.setData({
      curPage: this.data.curPage + 1
    });
    this.getGoodsList(true)
  },
  //分页查询
  getGoodsList: function (append) {
    var that = this;
    wx.showLoading({
      "mask": true
    })
    util.request(api.ForumReplay, {
      forumId: that.data.id,
      limit: 5,
      page: that.data.curPage
    }).then(function (res) {
      console.log(res)
      wx.hideLoading()
      console.log()
      if (that.data.curPage === res.data.pages) {
        that.setData({
          loadingMoreHidden: false
        });
        return
      }
      let forumReplay = [];
      if (append) {
        forumReplay = that.data.forumReplay
      }
      console.log(forumReplay)
      for (var i = 0; i < res.data.list.length; i++) {
        forumReplay.push(res.data.list[i]);
      }
      console.log(forumReplay)
      that.setData({
        loadingMoreHidden: true,
        forumReplay: forumReplay,
      });
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})