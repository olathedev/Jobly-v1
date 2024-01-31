const express = require('express')
const router = express.Router()
const {signup, signIn} = require('../controllers/auth-controllers')

router.post('/signup', signup)
router.post('/signin', signIn)
// router.post('/signin')

module.exports = router
