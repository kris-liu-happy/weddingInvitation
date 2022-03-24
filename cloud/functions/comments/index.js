const cloud = require('wx-server-sdk')

const { getAllComments } = require('./getAllComments.js')
const { addComment } = require('./addComment.js')
const { getLatestComments } = require('./getLatestComments.js')


cloud.init()

async function main (event, context) {
  const db = cloud.database()
  
  const { func, data } = event
  let res
  if (func === 'getAllComments') {
    res = await getAllComments(db)
  } else if (func === 'addComment') {
    res = await addComment(db, data, cloud)
  } else if (func === 'getLatestComments') {
    res = await getLatestComments(db, data)
  }

  return {
    data: res
  }
}

exports.main = main