var express = require("express");
var router = new express.Router();

var coordinatorController = require("../controllers/coordinator");
router.get("/list", coordinatorController.CoordinatorList);
router.get("/list/:deployment", coordinatorController.CoordinatorListForDeployment);
router.get("/:id", coordinatorController.coordinatorDetail);
router.post("/", coordinatorController.coordinatorCreate);
router.delete("/", coordinatorController.coordinatorDelete);
router.put("/", coordinatorController.coordinatorUpdate);

module.exports = router;
