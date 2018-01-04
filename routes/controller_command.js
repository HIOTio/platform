var express = require("express");
var router = new express.Router();

var controllerCommandController = require("../controllers/controller_command");

router.get("/", controllerCommandController.controller_commandList);
router.get("/controller/:controller", controllerCommandController.controller_commandListFor_controller);
router.get("/:id", controllerCommandController.controller_commandDetail);
router.post("/", controllerCommandController.controller_commandCreate);
router.delete("/", controllerCommandController.controllerCommandDelete);
router.put("/", controllerCommandController.controller_commandUpdate);

module.exports = router;
