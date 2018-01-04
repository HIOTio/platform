var express = require("express");
var router = new express.Router();

var thingController = require("../controllers/thing");
router.get("/list", thingController.thing_list);
router.get("/list/:deployment", thingController.thing_listForDeployment);
router.get("/:id", thingController.thing_detail);
router.post("/", thingController.thingCreate);
router.delete("/", thingController.thingDelete);
router.put("/", thingController.thing_update);

module.exports = router;