var express = require('express')
var router = express.Router()

var cors = require('cors')
var deploymentTypeController = require('../controllers/deployment_type.js')

router.all('*', cors({
  origin: 'http://localhost:4200',
  method: 'GET,PUT,POST,DELETE,OPTIONS',
  preflightContinue: true,
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true
}))

router.options('*', cors())
router.get('/', deploymentTypeController.deploymentTypeList)
router.get('/:id', deploymentTypeController.deploymentTypeDetail)
router.post('/', deploymentTypeController.deploymentTypeCreate)
router.delete('/', deploymentTypeController.deploymentTypeDelete)
router.put('/', deploymentTypeController.deploymentTypeUpdate)

module.exports = router
