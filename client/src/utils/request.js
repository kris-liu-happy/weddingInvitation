import Taro from '@tarojs/taro'

const xlRequest = (name, data,) => {
  return new Promise((resolve, reject) => {
    Taro.cloud.callFunction({
      name,
      data,
    }).then(res => {
      const data = res.result
      if (data.code === 200) {
        resolve(data.data)
      } else {
        wx.showToast({
          title: data.message,
          icon: 'error',
          duration: 2000
        })
        reject(err)
      }
    }).catch(err => {
      wx.showToast({
        title: '网络错误',
        icon: 'error',
        duration: 2000
      })
      reject(err)
    })
  })
}

export default xlRequest
