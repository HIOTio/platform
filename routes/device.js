var express = require('express')
var router = express.Router()

var deviceController = require('../controllers/device')

router.get('/', deviceController.device_list)
router.get('/config/:device',deviceController.config)
router.get('/count/deployment/:deployment', deviceController.device_count)
router.get('/deployment/:deployment/:location*?/:handler*?', deviceController.device_list_for_deployment)
router.get('/:id', deviceController.device_detail)
router.post('/', deviceController.device_create)
router.delete('/', deviceController.device_delete)
router.put('/', deviceController.device_update)

module.exports = router
