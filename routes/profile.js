var express = require('express')
var router = express.Router()

var profileController = require('../controllers/profile')
router.post('/auth', profileController.profile_auth)
router.get('/:profile', profileController.profile_detail)
router.delete('/', profileController.profile_delete)
router.put('/', profileController.profile_update)

module.exports = router
