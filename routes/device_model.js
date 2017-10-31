var express = require('express')
var router = express.Router()
var deviceModelController = require('../controllers/device_model')
router.get('/', deviceModelController.device_model_list)
router.get('/:id', deviceModelController.device_model_detail)
router.post('/', deviceModelController.device_model_create)
router.delete('/', deviceModelController.device_model_delete)
router.put('/', deviceModelController.device_model_update)
module.exports = router
