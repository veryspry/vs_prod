const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
// ---> /api/timeline <---
router.use('/timeline', require('./timeline'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
