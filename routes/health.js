var express = require("express");
var router = new express.Router();
var healthController = require("../controllers/health");
router.get("/", healthController.healthList);
router.get("/:id", healthController.healthDetail);
router.post("/", healthController.healthCreate);
router.delete("/", healthController.healthDelete);
router.put("/", healthController.healthUpdate);
module.exports = router;
