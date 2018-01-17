var express = require("express");
var router = new express.Router();
var cors = require("cors");
var deploymentController = require("../controllers/deployment.js");
router.options("*", cors());
router.get("/", deploymentController.deploymentList);
router.get("/summary/:_id", deploymentController.deploymentSummary);
router.get("/owner/:_id/:owner",deploymentController.deploymentChangeOwner);
router.get("/:_id", deploymentController.deploymentDetail);
router.post("/", deploymentController.deploymentCreate);
router.delete("/", deploymentController.deploymentDelete);
router.put("/", deploymentController.deploymentUpdate);

module.exports = router;