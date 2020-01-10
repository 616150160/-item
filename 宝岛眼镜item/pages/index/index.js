//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    login: false,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    img: 'http://m.qpic.cn/psc?/V11Hhl9G26RJ0q/riQ3veziueHEEyvCcu4t03Ye4SH6cexFVpt2kOcrtyc*djm6gnUJQFPh7BFt.B1SU1jTKJQN0ZmeGjmXBlTSdjDL0plDZ7v2aeh9d*pMuoc!/b&bo=7gIsBwAAAAARJ9c!&rf=viewer_4'
  },
  saveimg() {
    let that = this;
    wx.showLoading({
      title: '',
    })
    wx.downloadFile({
      url: that.data.img,
      success(res) {
        wx.hideLoading()
        console.log(res)
        let img = res.tempFilePath;
        wx.saveImageToPhotosAlbum({
          filePath: img,
          success(res) {
            console.log(res)
            if (res.errMsg == "saveImageToPhotosAlbum:ok") {
              wx.showModal({
                title: '提示',
                showCancel: false,
                content: '海报保存成功!分享给好友吧~',
              })
            }
          },
          fail(err) {
            console.log(err);
            if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny" || "saveImageToPhotosAlbum:fail authorize noresponse") {
              console.log("当初用户拒绝，再次发起授权")
              wx.showModal({
                title: '提示',
                showCancel: false,
                content: '授权才能保存图片',
                success(res) {
                  wx.openSetting({
                    success(settingdata) {
                      console.log(settingdata)
                      if (settingdata.authSetting['scope.writePhotosAlbum']) {
                        console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                      } else {
                        console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                      }
                    }
                  })
                }
              })
            }
          }
        })
      }
    })
  },
  getUserInfo(e) {
    let that = this;
    console.log(e.detail.errMsg)
    if (e.detail.errMsg == "getUserInfo:ok") {
      that.setData({
        login: true
      })
    }
  },
  img() {
    let that = this;
    wx.previewImage({
      current: that.data.img, // 当前显示图片的http链接
      urls: [that.data.img] // 需要预览的图片http链接列表
    })
  }
})