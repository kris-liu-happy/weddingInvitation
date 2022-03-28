async function getYearPhoto (db, data) {
  const photoDetailCollection = db.collection('photoDetail')

  try {
    const { year } = data
    const currentPhoto = (await photoDetailCollection.where({
      year, // 填入当前用户 openid
    }).get()).data
  
    return {
      code: 200,
      data: currentPhoto
    }
  } catch (error) {
    return {
      code: 500,
      data: error
    }
  }

}

exports.getYearPhoto = getYearPhoto
