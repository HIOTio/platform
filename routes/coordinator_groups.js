var express = require("express");
var router = new express.Router();
var coordinatorGroupController = require("../controllers/coordinator_groups");
router.get("/", coordinatorGroupController.coordinator_group_list);
router.get("/:id", coordinatorGroupController.coordinator_group_detail);
router.post("/", coordinatorGroupController.coordinator_groupCreate);
router.delete("/", coordinatorGroupController.coordinator_groupDelete);
router.put("/", coordinatorGroupController.coordinator_group_update);
module.exports = router;
