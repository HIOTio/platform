var express = require('express')
var router = express.Router()
var subscriptionController = require('../controllers/subscription')
router.get('/', subscriptionController.subscription_list)
router.get('/:id', subscriptionController.subscription_detail)
router.post('/', subscriptionController.subscription_create)
router.delete('/', subscriptionController.subscription_delete)
router.put('/', subscriptionController.subscription_update)
module.exports = router
