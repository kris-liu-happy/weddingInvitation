// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const userCollection = db.collection('user')

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { userInfo } = event
  try {
    
    const currentUser = (await userCollection.where({
      openId: wxContext.OPENID // 填入当前用户 openid
    }).get()).data
    // 是否是新用户
    if (!currentUser.length) {
    
      await userCollection.add({
        data: {
          openId: wxContext.OPENID,
          createdTime: db.serverDate(),
          updatedTime: '',
          ...userInfo,
        },
      })
      // 有记录，返回用户信息
    } else {

      userCollection.where({
        openId: wxContext.OPENID
      }).update({
        data: {
          openId: wxContext.OPENID,
          createdTime: currentUser[0].createdTime,
          updatedTime: db.serverDate(),
          ...userInfo,
        }
      })
    }

    return {
      code: 200,
      data: {
        openId: wxContext.OPENID
      }
    }
  } catch (e) {
    
    console.error(e)
    return {
      code: 500,
      message: '服务器错误',
    }
  }
}

