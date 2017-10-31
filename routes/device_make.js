var express = require('express')
var router = express.Router()
var deviceMakeController = require('../controllers/device_make')
router.get('/', deviceMakeController.device_make_list)
router.get('/:id', deviceMakeController.device_make_detail)
router.post('/', deviceMakeController.device_make_create)
router.delete('/', deviceMakeController.device_make_delete)
router.put('/', deviceMakeController.device_make_update)
module.exports = router
