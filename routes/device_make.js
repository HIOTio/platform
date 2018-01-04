var express = require("express");
var router = new express.Router();
var deviceMakeController = require("../controllers/device_make");
router.get("/", deviceMakeController.device_make_list);
router.get("/:id", deviceMakeController.device_make_detail);
router.post("/", deviceMakeController.device_makeCreate);
router.delete("/", deviceMakeController.device_makeDelete);
router.put("/", deviceMakeController.device_make_update);
module.exports = router;
