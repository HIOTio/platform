var express = require('express')
var router = express.Router()

var controllerController = require('../controllers/controller')

router.get('/', controllerController.controller_list)
router.get('/deployment/:deployment', controllerController.controller_list_for_thing)
router.get('/:id', controllerController.controller_detail)
router.post('/', controllerController.controller_create)
router.delete('/', controllerController.controller_delete)
router.put('/', controllerController.controller_update)

module.exports = router
