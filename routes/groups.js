var express = require('express')
var router = express.Router()
var groupController = require('../controllers/groups')
router.get('/', groupController.group_list)
router.get('/:id', groupController.group_detail)
router.post('/', groupController.group_create)
router.delete('/', groupController.group_delete)
router.put('/', groupController.group_update)
module.exports = router
