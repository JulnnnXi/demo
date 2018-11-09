//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    infoList: [],
    typeList: [],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500
  },
  


  onReady() {
    this.videoCtx = wx.createVideoContext('myVideo')
  },
  play() {
    this.videoCtx.play()
  },
  pause() {
    this.videoCtx.pause()
  },



  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../list/list'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onLoad: function () {
    const _this = this;
    wx.request({
      url: 'https://route.showapi.com/126-2',
      data: {
        showapi_appid: "79086",
        showapi_sign: "5ae1340b14ce40a19d763910107cfd9c"
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
      //  console.log(res.data.showapi_res_body.pagebean.contentlist)
        _this.setData({
          infoList: res.data.showapi_res_body.pagebean.contentlist
        })
      }
    })
    wx.request({
      url: 'https://route.showapi.com/126-1',
      data: {
        showapi_appid: "79086",
        showapi_sign: "5ae1340b14ce40a19d763910107cfd9c"
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data.showapi_res_body.allTypeList)
        _this.setData({
          typeList: res.data.showapi_res_body.allTypeList
        })
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
