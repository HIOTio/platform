var express = require("express");
var router = new express.Router();

var thingController = require("../controllers/thing");
router.get("/list", thingController.thingList);
router.get("/list/:deployment", thingController.thingListForDeployment);
router.get("/:_id", thingController.thingDetail);
router.post("/", thingController.thingCreate);
router.delete("/", thingController.thingDelete);
router.put("/", thingController.thingUpdate);

module.exports = router;