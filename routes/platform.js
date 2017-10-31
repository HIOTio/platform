var express = require('express')
var router = express.Router()
var platformController = require('../controllers/platform')
router.get('/', platformController.platform_list)
router.get('/:id', platformController.platform_detail)
router.post('/', platformController.platform_create)
router.delete('/', platformController.platform_delete)
router.put('/', platformController.platform_update)
module.exports = router
