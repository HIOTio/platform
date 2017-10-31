var express = require('express')
var router = express.Router()

var configController = require('../controllers/config')

router.get('/:device', configController.getDeviceConfig)
router.post('/', configController.testDeviceConfig)
router.delete('/', configController.resetDeviceConfig)
router.put('/', configController.updateDeviceConfig)

module.exports = router
