var express = require("express");
var router = new express.Router();

var profileController = require("../controllers/profile");
router.post("/auth", profileController.profileAuth);
router.get("/:profile", profileController.profileDetail);
router.delete("/", profileController.profileDelete);
router.put("/", profileController.profileUpdate);

module.exports = router;
