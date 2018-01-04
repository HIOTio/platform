var express = require('express')
var router = new express.Router()

var profileController = require('../controllers/profile')
var commsController = require('../controllers/comms')
router.post('/auth', profileController.profile_auth) // login
router.post('/register', profileController.profile_create) // register
router.post('/contact',commsController.newComms) //contact us link
module.exports = router
