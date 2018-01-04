var express = require("express");
var router = new express.Router();
var cors = require("cors");
var deploymentController = require("../controllers/deployment.js");
router.options("*", cors());
router.get("/", deploymentController.deployment_list);
router.get("/:id", deploymentController.deploymentDetail);
router.post("/", deploymentController.deployment_create);
router.delete("/", deploymentController.deployment_delete);
router.put("/", deploymentController.deployment_update);

module.exports = router;