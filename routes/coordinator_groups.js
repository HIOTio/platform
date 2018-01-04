var express = require("express");
var router = new express.Router();
var coordinatorGroupController = require("../controllers/coordinator_groups");
router.get("/", coordinatorGroupController.coordinatorGroupList);
router.get("/:id", coordinatorGroupController.coordinatorGroupDetail);
router.post("/", coordinatorGroupController.coordinatorGroupCreate);
router.delete("/", coordinatorGroupController.coordinatorGroupDelete);
router.put("/", coordinatorGroupController.coordinatorGroupUpdate);
module.exports = router;
