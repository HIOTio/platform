var express = require("express");
var router = new express.Router();

var controllerCommandController = require("../controllers/controller_command");

router.get("/", controllerCommandController.controllerCommandList);
router.get("/controller/:controller", controllerCommandController.controllerCommandListForController);
router.get("/:id", controllerCommandController.controllerCommandDetail);
router.post("/", controllerCommandController.controller_commandCreate);
router.delete("/", controllerCommandController.controllerCommandDelete);
router.put("/", controllerCommandController.controllerCommandUpdate);

module.exports = router;
