var express = require("express");
var router = new express.Router();
var sensorTypesController = require("../controllers/sensor_types");
router.get("/", sensorTypesController.sensor_types_list);
router.get("/:id", sensorTypesController.sensor_types_detail);
router.post("/", sensorTypesController.sensor_typesCreate);
router.delete("/", sensorTypesController.sensor_typesDelete);
router.put("/", sensorTypesController.sensor_types_update);
module.exports = router;
