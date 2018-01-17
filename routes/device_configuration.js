var express = require("express");
var router = new express.Router();

var deviceConfigurationController = require("../controllers/device_configuration");
router.get("/", deviceConfigurationController.deviceConfigurationList);
router.get("/:_id", deviceConfigurationController.deviceConfigurationDetail);
router.post("/", deviceConfigurationController.deviceConfigurationCreate);
router.delete("/", deviceConfigurationController.deviceConfigurationDelete);
router.put("/", deviceConfigurationController.deviceConfigurationUpdate);

module.exports = router;
