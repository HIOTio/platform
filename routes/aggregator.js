var express = require("express");
var router = new express.Router();

var aggregatorController = require("../controllers/aggregator");

router.get("/", aggregatorController.aggregator_list);

router.get("/fromList/:list", aggregatorController.aggregator_fromList);
router.get("/deployment/:deployment", aggregatorController.aggergator_list_for_deployment);
router.get("/:id", aggregatorController.aggregator_detail);
router.post("/", aggregatorController.aggregatorCreate);
router.delete("/", aggregatorController.aggregator_delete);
router.put("/", aggregatorController.aggregatorUpdate);

module.exports = router;
