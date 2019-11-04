// pages/xsyh/xsyh.js
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var user = require('../../utils/user.js');
//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft: 0,
    goods: '',//今日评鉴商品
    endGoods:'',//评鉴结果商品
  },
  //切换nav
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  //跳转详情页
  toDetailsTap: function (e) {
    wx.navigateTo({
      url: "/pages/goods/goods?id=" + e.currentTarget.dataset.id
    })
  },
  //跳转评鉴结果详情页
  goDetails:function(e){
    wx.navigateTo({
      url: './details/details?id=' + e.currentTarget.dataset.id,
    })
  },
  //跳转申请评鉴
  goApply:function(e){
    wx.navigateTo({
      url: './apply/apply?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this
    util.request(api.GetPage + "?ftype=0").then(function (res) {
      console.log(res)
      that.setData({
        goods: res.data.list
      });
    });
    util.request(api.GetPage+"?ftype=1").then(function (res) {
      console.log(res)
      that.setData({
        endGoods: res.data.list
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