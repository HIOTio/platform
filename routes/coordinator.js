var express = require("express");
var router = new express.Router();

var coordinatorController = require("../controllers/coordinator");
router.get("/list", coordinatorController.Coordinator_list);
router.get("/list/:deployment", coordinatorController.Coordinator_listForDeployment);
router.get("/:id", coordinatorController.coordinator_detail);
router.post("/", coordinatorController.coordinatorCreate);
router.delete("/", coordinatorController.coordinatorDelete);
router.put("/", coordinatorController.coordinator_update);

module.exports = router;
