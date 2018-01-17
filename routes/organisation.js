var express = require("express");
var router = new express.Router();

var organisationController = require("../controllers/organisation");

router.get("/", organisationController.organisationList);
router.get("/:_id", organisationController.organisationDetail);
router.post("/", organisationController.newOrganisation);
router.delete("/", organisationController.organisationDelete);
router.put("/", organisationController.updateOrganisation);
router.put("/am", organisationController.addMember);
router.put("/im", organisationController.inviteMembers);

module.exports = router;
