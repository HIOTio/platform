var express = require('express')
var router = express.Router()

var coordinatorController = require('../controllers/coordinator')
router.get('/list', coordinatorController.Coordinator_list)
router.get('/list/:deployment', coordinatorController.Coordinator_list_for_deployment)
router.get('/:id', coordinatorController.coordinator_detail)
router.post('/', coordinatorController.coordinator_create)
router.delete('/', coordinatorController.coordinator_delete)
router.put('/', coordinatorController.coordinator_update)

module.exports = router
