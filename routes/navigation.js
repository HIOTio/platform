var express = require("express");
var router = new express.Router();
var navigationController = require("../controllers/navigation");
router.get("/:profile", navigationController.navigationList);
module.exports = router;
