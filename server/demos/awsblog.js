const router = require('express').Router()
const path = require('path')
module.exports = router


router.get('/*', (req, res, next) => {
  console.log('__dirname', __dirname);
  res.sendFile(path.join(__dirname, '../..', 'AWS-blog/build/index.html'))
})
