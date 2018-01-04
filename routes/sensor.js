var express = require("express");
var router = new express.Router();

var sensorController = require("../controllers/sensor");
router.get("/", sensorController.sensor_list);
router.get("/list/:deployment", sensorController.sensorListForDeployment);
router.get("/:id", sensorController.sensor_detail);
router.post("/", sensorController.sensor_create);
router.delete("/", sensorController.sensor_delete);
router.put("/", sensorController.sensor_update);

module.exports = router;
