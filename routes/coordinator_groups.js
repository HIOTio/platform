var express = require("express");
var router = new express.Router();
var coordinatorGroupController = require("../controllers/coordinator_groups");
router.get("/", coordinatorGroupController.coordinator_groupList);
router.get("/:id", coordinatorGroupController.coordinator_groupDetail);
router.post("/", coordinatorGroupController.coordinator_groupCreate);
router.delete("/", coordinatorGroupController.coordinator_groupDelete);
router.put("/", coordinatorGroupController.coordinator_groupUpdate);
module.exports = router;
