var express = require('express')
var router = express.Router()

var brokerController = require('../controllers/broker')

router.get('/', brokerController.broker_list)
router.get('/list/:deployment', brokerController.broker_list_for_deployment)
router.get('/:_id', brokerController.broker_detail)
router.post('/', brokerController.broker_create)
router.delete('/', brokerController.broker_delete)
router.put('/', brokerController.broker_update)

module.exports = router
