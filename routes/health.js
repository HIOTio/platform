var express = require("express");
var router = new express.Router();
var healthController = require("../controllers/health");
router.get("/", healthController.health_list);
router.get("/:id", healthController.health_detail);
router.post("/", healthController.healthCreate);
router.delete("/", healthController.healthDelete);
router.put("/", healthController.health_update);
module.exports = router;
