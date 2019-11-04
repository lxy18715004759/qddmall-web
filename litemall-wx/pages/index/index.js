const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../utils/user.js');

//获取应用实例
const app = getApp();

Page({
  data: {
    newGoods: [],
    hotGoods: [],
    topics: [],
    brands: [],
    groupons: [],
    floorGoods: [],
    banner: [],
    channel: [],
    coupon: [],
    curPage:1,// 查询页数
    windowsBar:0,//下拉是否显示搜索框
    loadingMoreHidden: true,//是否更多刷新
    GoodsList:[],//分页查询商品列表
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom
  },
  // 页面跳转
  gomiaosha() {
    wx.showToast({
      title: '暂未开放',
    })
    // wx.navigateTo({
    //   url: '../miaosha/miaosha',
    // })
  },
  gotuangou() {
    wx.showToast({
      title: '暂未开放',
    })
    // wx.navigateTo({
    //   url: '../tuangou/tuangou',
    // })
  },
  gopintuan() {
    wx.showToast({
      title: '暂未开放',
    })
    // wx.navigateTo({
    //   url: '../pintuan/pintuan',
    // })
  },
  goEvaluation() {
    wx.navigateTo({
      url: '../evaluation/evaluation',
    })
  },
  goRecommend() {
    wx.navigateTo({
      url: '../recommend/recommend',
    })
  },
  goMessage(){
    wx.navigateTo({
      url: '../message/message',
    })
  },
  goForum(){
    wx.navigateTo({
      url: '../forum/forum',
    })
  },
  //商品详情跳转
  toDetailsTap: function (e) {
    wx.navigateTo({
      url: "/pages/goods/goods?id=" + e.currentTarget.dataset.id
    })
  },
  //分享页面
  onShareAppMessage: function() {
    return {
      title: '俏东东',
      desc: '俏东东佳品商城',
      path: '/pages/index/index'
    }
  },
  //下拉刷新
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
    util.request(api.GoodsList + "?page=" + that.data.curPage).then(function (res) {
      console.log(res)
      wx.hideLoading()
      if (res.data.pages===res.data.page) {
        that.setData({
          loadingMoreHidden: false
        });
        return
      }
      let goods = [];
      if (append) {
        goods = that.data.GoodsList
      }
      console.log(goods)
      for (var i = 0; i < res.data.list.length; i++) {
        goods.push(res.data.list[i]);
      }
      console.log(goods)
      that.setData({
        loadingMoreHidden: true,
        GoodsList: goods,
      });
    });
  },
  // 上拉刷新
  onPullDownRefresh() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getIndexData();
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },
  // 获取首页数据
  getIndexData: function() {
    let that = this;
    util.request(api.IndexUrl).then(function(res) {
      if (res.errno === 0) {
        that.setData({
          newGoods: res.data.newGoodsList,
          hotGoods: res.data.hotGoodsList,
          topics: res.data.topicList,
          brands: res.data.brandList,
          floorGoods: res.data.floorGoodsList,
          banner: res.data.banner,
          groupons: res.data.grouponList,
          channel: res.data.channel,
          coupon: res.data.couponList,
        });
      }
    });
    util.request(api.GoodsCount).then(function (res) {
      that.setData({
        goodsCount: res.data
      });
    });
    util.request(api.GoodsList).then(function (res) {
      console.log(res)
      that.setData({
        GoodsList: res.data.list
      });
    });
  },
  onPageScroll: function (e) {
    console.log(e.scrollTop)
    if (e.scrollTop > this.data.CustomBar){
      this.setData({
        windowsBar:1
      })
    }else{
      this.setData({
        windowsBar: 0
      })
    }
    // 滚动到距顶部距离
    // wx.pageScrollTo({
    //   scrollTop: 0,
    //   duration: 300
    // })
  },
  onLoad: function(options) {
    console.log(this.data.CustomBar)
    // 页面初始化 options为页面跳转所带来的参数
    if (options.scene) {
      //这个scene的值存在则证明首页的开启来源于朋友圈分享的图,同时可以通过获取到的goodId的值跳转导航到对应的详情页
      var scene = decodeURIComponent(options.scene);
      console.log("scene:" + scene);

      let info_arr = [];
      info_arr = scene.split(',');
      let _type = info_arr[0];
      let id = info_arr[1];

      if (_type == 'goods') {
        wx.navigateTo({
          url: '../goods/goods?id=' + id
        });
      } else if (_type == 'groupon') {
        wx.navigateTo({
          url: '../goods/goods?grouponId=' + id
        });
      } else {
        wx.navigateTo({
          url: '../index/index'
        });
      }
    }

    // 页面初始化 options为页面跳转所带来的参数
    if (options.grouponId) {
      //这个pageId的值存在则证明首页的开启来源于用户点击来首页,同时可以通过获取到的pageId的值跳转导航到对应的详情页
      wx.navigateTo({
        url: '../goods/goods?grouponId=' + options.grouponId
      });
    }

    // 页面初始化 options为页面跳转所带来的参数
    if (options.goodId) {
      //这个goodId的值存在则证明首页的开启来源于分享,同时可以通过获取到的goodId的值跳转导航到对应的详情页
      wx.navigateTo({
        url: '../goods/goods?id=' + options.goodId
      });
    }

    // 页面初始化 options为页面跳转所带来的参数
    if (options.orderId) {
      //这个orderId的值存在则证明首页的开启来源于订单模版通知,同时可以通过获取到的pageId的值跳转导航到对应的详情页
      wx.navigateTo({
        url: '../ucenter/orderDetail/orderDetail?id=' + options.orderId
      });
    }

    this.getIndexData();
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
  // 获取优惠券
  getCoupon(e) {
    if (!app.globalData.hasLogin) {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    }

    let couponId = e.currentTarget.dataset.index
    util.request(api.CouponReceive, {
      couponId: couponId
    }, 'POST').then(res => {
      if (res.errno === 0) {
        wx.showToast({
          title: "领取成功"
        })
      }
      else{
        util.showErrorToast(res.errmsg);
      }
    })
  },
})