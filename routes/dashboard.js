var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
  res.send('dashboard in here')
})

router.get('/health', function (req, res) {
  res.send('Deployment Health')
})
router.get('/deployments', function (req, res) {
  res.send('My Deployments')
})
router.get('/map', function (req, res) {
  res.send('Deployment Map')
})
router.get('/reports', function (req, res) {
  res.send('Deployment Reports')
})
router.get('/user', function (req, res) {
  res.send('Deployment User List')
})
router.post('/user', function (req, res) {
  res.send('Create Deployment User ')
})
router.put('/user', function (req, res) {
  res.send('Update Deployment User')
})
router.get('/group', function (req, res) {
  res.send('Deployment User Group List')
})
router.post('/group', function (req, res) {
  res.send('Create Deployment User Group')
})
router.put('/group', function (req, res) {
  res.send('Update Deployment User Group')
})
module.exports = router
