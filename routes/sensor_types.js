var express = require("express");
var router = new express.Router();
var sensorTypesController = require("../controllers/sensor_types");
router.get("/", sensorTypesController.sensor_typesList);
router.get("/:id", sensorTypesController.sensor_typesDetail);
router.post("/", sensorTypesController.sensor_typesCreate);
router.delete("/", sensorTypesController.sensor_typesDelete);
router.put("/", sensorTypesController.sensor_typesUpdate);
module.exports = router;
