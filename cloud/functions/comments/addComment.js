async function addComment (db, data, cloud) {
  const wxContext = cloud.getWXContext()
  const userCollection = db.collection('user')
  const commentsCollection = db.collection('comments')

  try {
    const currentUser = (await userCollection.where({
      openId: wxContext.OPENID // 填入当前用户 openid
    }).get()).data
  
    if(currentUser.length) {
      const { comment } = data
      const {nickName,avatarUrl} = currentUser[0]
      await commentsCollection.add({
        data: {
          nickName,
          avatarUrl,
          comment,
          createdTime: db.serverDate(),
        },
      })
    }
  
    return {
      code: 200,
      data: '已收到你的祝福'
    }
  } catch (error) {
    return {
      code: 500,
      data: error
    }
  }

}

exports.addComment = addComment
