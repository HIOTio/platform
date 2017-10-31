var express = require('express')
var router = express.Router()

var profileController = require('../controllers/profile')
router.post('/auth', profileController.profile_auth) // login
router.post('/register', profileController.profile_create) // register

module.exports = router
