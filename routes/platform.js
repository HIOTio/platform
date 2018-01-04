var express = require("express");
var router = new express.Router();
var platformController = require("../controllers/platform");
router.get("/", platformController.platform_list);
router.get("/:id", platformController.platform_detail);
router.post("/", platformController.platformCreate);
router.delete("/", platformController.platformDelete);
router.put("/", platformController.platform_update);
module.exports = router;
