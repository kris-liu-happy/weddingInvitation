async function getPhotoList (db) {
  const photoCollection = db.collection('photo')

  try {
    const gitphotoList = (await photoCollection.where({}).get()).data
  
    return {
      code: 200,
      data: gitphotoList
    }
  } catch (error) {
    return {
      code: 500,
      data: error
    }
  }

}

exports.getPhotoList = getPhotoList
