var express = require('express')
var router = express.Router()
var topicController = require('../controllers/topic')
router.get('/', topicController.topic_list)
router.get('/:id', topicController.topic_detail)
router.post('/', topicController.topic_create)
router.delete('/', topicController.topic_delete)
router.put('/', topicController.topic_update)
module.exports = router
