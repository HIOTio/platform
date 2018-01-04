var express = require("express");
var router = new express.Router();

var deviceConfigurationController = require("../controllers/device_configuration");
router.get("/", deviceConfigurationController.device_configurationList);
router.get("/:id", deviceConfigurationController.device_configurationDetail);
router.post("/", deviceConfigurationController.device_configurationCreate);
router.delete("/", deviceConfigurationController.device_configurationDelete);
router.put("/", deviceConfigurationController.device_configurationUpdate);

module.exports = router;
