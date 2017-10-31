var express = require('express')
var router = express.Router()

var thingController = require('../controllers/thing')
router.get('/list', thingController.thing_list)
router.get('/list/:deployment', thingController.thing_list_for_deployment)
router.get('/:id', thingController.thing_detail)
router.post('/', thingController.thing_create)
router.delete('/', thingController.thing_delete)
router.put('/', thingController.thing_update)

module.exports = router
