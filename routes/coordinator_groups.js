var express = require('express')
var router = express.Router()
var coordinatorGroupController = require('../controllers/coordinator_groups')
router.get('/', coordinatorGroupController.coordinator_group_list)
router.get('/:id', coordinatorGroupController.coordinator_group_detail)
router.post('/', coordinatorGroupController.coordinator_group_create)
router.delete('/', coordinatorGroupController.coordinator_group_delete)
router.put('/', coordinatorGroupController.coordinator_group_update)
module.exports = router
