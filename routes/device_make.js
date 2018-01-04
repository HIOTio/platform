var express = require("express");
var router = new express.Router();
var deviceMakeController = require("../controllers/device_make");
router.get("/", deviceMakeController.device_makeList);
router.get("/:id", deviceMakeController.device_makeDetail);
router.post("/", deviceMakeController.device_makeCreate);
router.delete("/", deviceMakeController.device_makeDelete);
router.put("/", deviceMakeController.device_makeUpdate);
module.exports = router;
