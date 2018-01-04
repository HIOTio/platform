var express = require("express");
var router = new express.Router();
var sensorTypesController = require("../controllers/sensorTypes");
router.get("/", sensorTypesController.sensorTypesList);
router.get("/:id", sensorTypesController.sensorTypesDetail);
router.post("/", sensorTypesController.sensorTypesCreate);
router.delete("/", sensorTypesController.sensorTypesDelete);
router.put("/", sensorTypesController.sensorTypesUpdate);
module.exports = router;
