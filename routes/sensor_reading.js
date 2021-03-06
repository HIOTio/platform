var express = require("express");
var router = new express.Router();

var SensorReadingController = require("../controllers/sensor_reading");
router.get("/list", SensorReadingController.sensorReadingList);
router.get("/list/:sensor_id", SensorReadingController.sensorReadingListForSensor);
router.get("/:_id", SensorReadingController.sensorReadingDetail);

module.exports = router;
