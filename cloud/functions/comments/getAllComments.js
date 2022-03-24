async function getAllComments (db) {
  const commentsCollection = db.collection('comments')

  try {
    const gitComments = (await commentsCollection.where({}).get()).data
  
    return {
      code: 200,
      data: gitComments
    }
  } catch (error) {
    return {
      code: 500,
      data: error
    }
  }

}

exports.getAllComments = getAllComments
