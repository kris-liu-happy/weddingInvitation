// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const weddingCollection = db.collection('weddingInformation')

exports.main = async () => {
  try {
    
    const information = (await weddingCollection.where({}).get()).data
    return {
      code: 200,
      data: information[0]
    }
  } catch (e) {
    
    console.error(e)
    return {
      code: 500,
      message: '服务器错误',
    }
  }
}

