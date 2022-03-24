const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const userCollection = db.collection('user')

async function main (event, context) {

  const wxContext = cloud.getWXContext()

  const currentUser = (await userCollection.where({
    openId: wxContext.OPENID // 填入当前用户 openid
  }).get()).data

  console.log(currentUser)

  return {
    data: currentUser[0].prize || 0
  }

}

exports.main = main