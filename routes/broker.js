var express = require("express");
var router = new express.Router();

var brokerController = require("../controllers/broker");

router.get("/", brokerController.brokerList);
router.get("/list/:deployment", brokerController.brokerListForDeployment);
router.get("/:_id", brokerController.brokerDetail);
router.post("/", brokerController.brokerCreate);
router.delete("/", brokerController.brokerDelete);
router.put("/", brokerController.brokerUpdate);

module.exports = router;
