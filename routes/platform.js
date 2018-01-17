var express = require("express");
var router = new express.Router();
var platformController = require("../controllers/platform");
router.get("/", platformController.platformList);
router.get("/:_id", platformController.platformDetail);
router.post("/", platformController.platformCreate);
router.delete("/", platformController.platformDelete);
router.put("/", platformController.platformUpdate);
module.exports = router;
