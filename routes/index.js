const express = require('express')
const router = express.Router()
const userRouter = require('./user')
const filmRouter = require('./film')

router.use('/users', userRouter)
router.use('/films', filmRouter)

module.exports = router;