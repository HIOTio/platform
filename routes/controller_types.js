var express = require("express");
var router = new express.Router();

var controllerTypesController = require("../controllers/controller_types");

router.get("/", controllerTypesController.list);
router.get("/:_id", controllerTypesController.details);
router.post("/", controllerTypesController.create);
router.delete("/", controllerTypesController.delete);
router.put("/", controllerTypesController.update);

module.exports = router;
