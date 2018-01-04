var express = require("express")
var router = new express.Router()

var profileController = require("../controllers/profile")
var commsController = require("../controllers/comms")
router.post("/auth", profileController.profileAuth) // login
router.post("/register", profileController.profileCreate) // register
router.post("/contact",commsController.newComms) //contact us link
module.exports = router
