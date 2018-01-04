var express = require("express");
var router = new express.Router();

var SensorReadingController = require("../controllers/sensor_reading");
router.get("/list", SensorReadingController.sensor_reading_list);
router.get("/list/:sensor_id", SensorReadingController.sensor_reading_list_for_sensor);
router.get("/:id", SensorReadingController.sensor_reading_detail);

module.exports = router;
