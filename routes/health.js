var express = require('express')
var router = express.Router()
var healthController = require('../controllers/health')
router.get('/', healthController.health_list)
router.get('/:id', healthController.health_detail)
router.post('/', healthController.health_create)
router.delete('/', healthController.health_delete)
router.put('/', healthController.health_update)
module.exports = router
