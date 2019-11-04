// pages/xsyh/xsyh.js
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var user = require('../../../utils/user.js');
//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft: 0,
    addressDefault:'',
    addressList: '',//地址列表
    addressIdList:'',//地址id列表
    goods: '',//单个评鉴商品
    moreGoods: '',//全部评鉴商品
    id: '',//当个商品id
    addressId:''//地址id  
  },
  PickerChange(e) {
    this.setData({
      addressDefault: this.data.addressList[e.detail.value],
      addressId: this.data.addressIdList[e.detail.value]
    })
  },
  //提交申请
  submile(e){
    console.log("提交申请")
    console.log(e)
    var reason=e.detail.value.reason
    var address=e.detail.value.address
    util.request(api.UserAdd + "?addressId=" + this.data.addressId + "&applyReason=" + reason).then(function (res) {
      console.log(res)
      if(res.data===true){
          wx.showToast({
            title: '提交成功',
          })
        setTimeout(function () {
          wx.reLaunch({
            url: '../../index/index',
          })
        }, 2000)
      }
    });
  },
  //切换nav
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  //立即申请
  timeApply: function (e) {
    wx.navigateTo({
      url: '../timeApply/timeApply?id=' + e.currentTarget.dataset.id,
    })
  },
  //跳转详情页
  toDetailsTap: function (e) {
    wx.navigateTo({
      url: "/pages/goods/goods?id=" + e.currentTarget.dataset.id
    })
  },
  //跳转申请评鉴
  goApply: function (e) {
    wx.navigateTo({
      url: '../apply/apply?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this
    that.setData({
      id: e.id
    })
    util.request(api.GetDetail + "?id=" + that.data.id).then(function (res) {
      console.log(res)
      that.setData({
        goods: res.data
      });
    });
    util.request(api.GetPage).then(function (res) {
      console.log(res)
      that.setData({
        moreGoods: res.data.list
      });
    });
  },
  //获取地址列表
  getAddressList() {
    let that = this;
    util.request(api.AddressList).then(function (res) {
      if (res.errno === 0) {
        let addressList=res.data.list
        let addressDetail=[]
        let addressIdList=[]
        for(var i=0;i<addressList.length;i++){
          addressDetail.push(addressList[i].province + addressList[i].city + addressList[i].county + addressList[i].addressDetail)
          addressIdList.push(addressList[i].id)
          if (addressList[i].isDefault==true){
            var addressDefault = addressList[i].province + addressList[i].city + addressList[i].county + addressList[i].addressDetail
            var addressId = addressList[i].id
          }
        }
        that.setData({
          addressIdList:addressIdList,
          addressList: addressDetail,
          addressId: addressId,
          addressDefault: addressDefault
        });
      }
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
    this.getAddressList();
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