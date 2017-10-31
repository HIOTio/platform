var express = require('express')
var router = express.Router()
var sensorTypesController = require('../controllers/sensor_types')
router.get('/', sensorTypesController.sensor_types_list)
router.get('/:id', sensorTypesController.sensor_types_detail)
router.post('/', sensorTypesController.sensor_types_create)
router.delete('/', sensorTypesController.sensor_types_delete)
router.put('/', sensorTypesController.sensor_types_update)
module.exports = router
