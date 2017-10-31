var express = require('express')
var router = express.Router()

var handlerController = require('../controllers/handler')

router.get('/', handlerController.handler_list)
router.get('/deployment/:deployment', handlerController.handler_list_deployment)
router.get('/:id', handlerController.handler_detail)
router.post('/', handlerController.handler_create)
router.delete('/', handlerController.handler_delete)
router.put('/', handlerController.handler_update)

module.exports = router
