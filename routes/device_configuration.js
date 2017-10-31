var express = require('express')
var router = express.Router()

var deviceConfigurationController = require('../controllers/device_configuration')
router.get('/', deviceConfigurationController.device_configuration_list)
router.get('/:id', deviceConfigurationController.device_configuration_detail)
router.post('/', deviceConfigurationController.device_configuration_create)
router.delete('/', deviceConfigurationController.device_configuration_delete)
router.put('/', deviceConfigurationController.device_configuration_update)

module.exports = router
