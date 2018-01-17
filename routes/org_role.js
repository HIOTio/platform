var express = require("express");
var router = new express.Router();

var orgRoleController = require("../controllers/org_role");

router.get("/", orgRoleController.orgRoleList);
router.get("/:_id", orgRoleController.orgRoleDetail);
router.post("/", orgRoleController.newOrgRole);
router.delete("/", orgRoleController.orgRoleDelete);
router.put("/", orgRoleController.updateOrgRole);

module.exports = router;
