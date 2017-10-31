var express = require('express')
var router = express.Router()
var navigationController = require('../controllers/navigation')
router.get('/:profile', navigationController.navigation_list)
module.exports = router
