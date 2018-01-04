var express = require("express");
var router = new express.Router();

var sensorController = require("../controllers/sensor");
router.get("/", sensorController.sensorList);
router.get("/list/:deployment", sensorController.sensorListForDeployment);
router.get("/:id", sensorController.sensorDetail);
router.post("/", sensorController.sensorCreate);
router.delete("/", sensorController.sensorDelete);
router.put("/", sensorController.sensorUpdate);

module.exports = router;
