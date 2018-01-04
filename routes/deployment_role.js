var express = require("express");
var router = new express.Router();

var deploymentRoleController = require("../controllers/deployment_role");

router.get("/", deploymentRoleController.deploymentRoleList);
router.get("/:id", deploymentRoleController.deploymentRoleDetail);
router.get("/deployment/:deployment", deploymentRoleController.deploymentRoleDetailByDeployment);
router.get("/profile/:profile", deploymentRoleController.deploymentRoleDetailByProfile);
router.post("/", deploymentRoleController.deploymentRoleCreate);
router.put("/", deploymentRoleController.deploymentRoleUpdate);

module.exports = router;
