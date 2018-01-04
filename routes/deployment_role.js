var express = require("express");
var router = new express.Router();

var deploymentRoleController = require("../controllers/deployment_role");

router.get("/", deploymentRoleController.deployment_role_list);
router.get("/:id", deploymentRoleController.deployment_role_detail);
router.get("/deployment/:deployment", deploymentRoleController.deployment_role_detail_by_deployment);
router.get("/profile/:profile", deploymentRoleController.deployment_role_detail_by_profile);
router.post("/", deploymentRoleController.deployment_roleCreate);
router.put("/", deploymentRoleController.deployment_role_update);

module.exports = router;
