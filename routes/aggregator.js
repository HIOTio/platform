var express = require('express')
var router = express.Router()

var aggregatorController = require('../controllers/aggregator')

router.get('/', aggregatorController.aggregator_list)

router.get('/fromList/:list', aggregatorController.aggregator_fromList)
router.get('/deployment/:deployment', aggregatorController.aggergator_list_for_deployment)
router.get('/:id', aggregatorController.aggregator_detail)
router.post('/', aggregatorController.aggregator_create)
router.delete('/', aggregatorController.aggregator_delete)
router.put('/', aggregatorController.aggregator_update)

module.exports = router
