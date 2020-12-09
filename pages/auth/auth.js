// pages/auth.js
const app=getApp()
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        app.globalData.openid = res.result.openid
        console.log(app.globalData.openid)
      }
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

  },
  bindGetUserInfo: function (res) {
    if (res.detail.userInfo) {
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(res.detail.userInfo);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      db.collection('examinee').where({
        _openid: app.globalData.openid
      })
      .get({
        success: function(res){
          console.log(res)
          if(!res.data.length){
            console.log('fail')
            wx.redirectTo({
              url: '../../pages/register/register',
            })
          }
          else{
            wx.switchTab({
              url: "../../pages/home/home",
            })
          }
        }
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '注意',
        content: '您需要授权以继续使用本程序',
        showCancel: false,
        confirmText: '返回授权',
      });
    }
  }
})