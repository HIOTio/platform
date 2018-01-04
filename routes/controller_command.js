var express = require("express");
var router = new express.Router();

var controllerCommandController = require("../controllers/controller_command");

router.get("/", controllerCommandController.controller_command_list);
router.get("/controller/:controller", controllerCommandController.controller_command_list_for_controller);
router.get("/:id", controllerCommandController.controller_command_detail);
router.post("/", controllerCommandController.controller_commandCreate);
router.delete("/", controllerCommandController.controllerCommandDelete);
router.put("/", controllerCommandController.controller_command_update);

module.exports = router;
