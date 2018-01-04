var express = require("express");
var router = new express.Router();
var deviceModelController = require("../controllers/device_model");
router.get("/", deviceModelController.device_modelList);
router.get("/:id", deviceModelController.device_modelDetail);
router.post("/", deviceModelController.deviceModelCreate);
router.delete("/", deviceModelController.device_modelDelete);
router.put("/", deviceModelController.device_modelUpdate);
module.exports = router;
