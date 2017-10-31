var express = require('express')
var router = express.Router()

var cors = require('cors')
var deploymentController = require('../controllers/deployment.js')

router.all('*', cors({
  origin: 'http://localhost:4200',
  method: 'GET,PUT,POST,DELETE,OPTIONS',
  preflightContinue: true,
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true
}))

router.options('*', cors())
router.get('/', deploymentController.deployment_list)
router.get('/:id', deploymentController.deployment_detail)
router.post('/', deploymentController.deployment_create)
router.delete('/', deploymentController.deployment_delete)
router.put('/', deploymentController.deployment_update)

module.exports = router
