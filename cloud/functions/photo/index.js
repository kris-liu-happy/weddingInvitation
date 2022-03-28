const cloud = require('wx-server-sdk')

const { getPhotoList } = require('./getPhotoList.js')
const { getYearPhoto } = require('./getYearPhoto.js')

cloud.init()

async function main (event, context) {
  const db = cloud.database()
  
  const { func, data } = event
  let res
  if (func === 'getPhotoList') {
    res = await getPhotoList(db)
  } else if (func === 'getYearPhoto') {
    res = await getYearPhoto(db, data, cloud)
  }

  return res
}

exports.main = main