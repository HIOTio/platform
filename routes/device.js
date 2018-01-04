var express = require("express");
var router = new express.Router();

var deviceController = require("../controllers/device");

router.get("/", deviceController.deviceList);
router.get("/config/:device",deviceController.config);
router.get("/count/deployment/:deployment", deviceController.deviceCount);
router.get("/deployment/:deployment/:location*?/:handler*?", deviceController.deviceListForDeployment);
router.get("/:id", deviceController.deviceDetail);
router.post("/", deviceController.deviceCreate);
router.delete("/", deviceController.deviceDelete);
router.put("/", deviceController.deviceUpdate);

module.exports = router;
