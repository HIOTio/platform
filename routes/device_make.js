var express = require("express");
var router = new express.Router();
var deviceMakeController = require("../controllers/device_make");
router.get("/", deviceMakeController.deviceMakeList);
router.get("/:_id", deviceMakeController.deviceMakeDetail);
router.post("/", deviceMakeController.deviceMakeCreate);
router.delete("/", deviceMakeController.deviceMakeDelete);
router.put("/", deviceMakeController.deviceMakeUpdate);
module.exports = router;
