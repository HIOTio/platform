var express = require('express')
var router = express.Router()
var paramController = require('../controllers/param')
router.get('/', paramController.param_list)
router.get('/:id', paramController.param_detail)
router.post('/', paramController.param_create)
router.delete('/', paramController.param_delete)
router.put('/', paramController.param_update)
module.exports = router
