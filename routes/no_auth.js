var express = require("express");
var router = new express.Router();

var profileController = require("../controllers/profile");
var commsController = require("../controllers/comms");
router.post("/auth", profileController.profileAuth);
router.post("/register", profileController.profileCreate);
router.post("/contact",commsController.newComms);
module.exports = router;
