var express = require("express");
var router = new express.Router();
var navigationController = require("../controllers/navigation");
router.get("/:profile", navigationController.navigation_list);
module.exports = router;
