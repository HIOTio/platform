var express = require('express')
var router = express.Router()

var roleController = require('../controllers/role')
router.get('/', roleController.role_list)
router.get('/:id', roleController.role_detail)
router.post('/', roleController.role_create)
router.delete('/', roleController.role_delete)
router.put('/', roleController.role_update)

module.exports = router
