var express = require("express");
var router = new express.Router();

var controllerController = require("../controllers/controller");

router.get("/", controllerController.controller_list);
router.get("/deployment/:deployment", controllerController.controller_list_for_thing);
router.get("/:id", controllerController.controller_detail);
router.post("/", controllerController.controllerCreate);
router.delete("/", controllerController.controllerDelete);
router.put("/", controllerController.controller_update);

module.exports = router;
