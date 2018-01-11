var express = require("express");
var router = new express.Router();

var aggregatorController = require("../controllers/aggregator");

router.get("/", aggregatorController.aggregatorList);

router.get("/fromList/:list", aggregatorController.aggregator_fromList);
router.get("/deployment/:deployment", aggregatorController.aggergatorListForDeployment);
router.get("/device/:device", aggregatorController.aggergatorListForDevice);
router.get("/:id", aggregatorController.aggregatorDetail);
router.post("/", aggregatorController.aggregatorCreate);
router.delete("/", aggregatorController.aggregatorDelete);
router.put("/", aggregatorController.aggregatorUpdate);

module.exports = router;
