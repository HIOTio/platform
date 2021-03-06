var express = require("express");
var router = new express.Router();

var controllerController = require("../controllers/controller");

router.get("/", controllerController.controllerList);
router.get("/deployment/:deployment", controllerController.controllerListDeployment);
router.get("/:_id", controllerController.controllerDetail);
router.post("/", controllerController.controllerCreate);
router.delete("/", controllerController.controllerDelete);
router.put("/", controllerController.controllerUpdate);

module.exports = router;
