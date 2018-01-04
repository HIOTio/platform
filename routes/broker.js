var express = require("express");
var router = new express.Router();

var brokerController = require("../controllers/broker");

router.get("/", brokerController.broker_list);
router.get("/list/:deployment", brokerController.broker_listForDeployment);
router.get("/:_id", brokerController.broker_detail);
router.post("/", brokerController.brokerCreate);
router.delete("/", brokerController.brokerDelete);
router.put("/", brokerController.broker_update);

module.exports = router;
