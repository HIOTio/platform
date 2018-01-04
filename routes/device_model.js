var express = require("express");
var router = new express.Router();
var deviceModelController = require("../controllers/device_model");
router.get("/", deviceModelController.device_model_list);
router.get("/:id", deviceModelController.device_model_detail);
router.post("/", deviceModelController.deviceModelCreate);
router.delete("/", deviceModelController.device_modelDelete);
router.put("/", deviceModelController.device_model_update);
module.exports = router;
