var express = require('express')
var router = express.Router()
var publicationController = require('../controllers/publication')
router.get('/', publicationController.publication_list)
router.get('/:id', publicationController.publication_detail)
router.post('/', publicationController.publication_create)
router.delete('/', publicationController.publication_delete)
router.put('/', publicationController.publication_update)
module.exports = router
