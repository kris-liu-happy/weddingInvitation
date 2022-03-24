import Taro from '@tarojs/taro'

const getCurrentPages = () => {
  const pages = Taro.getCurrentPages()
  if (!pages || !pages.length) return ''
  const currentPage = pages[pages.length-1]
  const url = currentPage.route
  return url
}

const setStorage = (key, data) => {
  return new Promise((resolve, reject) => {
    Taro.setStorage({
      key,
      data,
      success() {
        resolve()
      },
      error(res) {
        reject(res)
      }
    })
  })
}


export {
  getCurrentPages,
  setStorage
}
