var express = require("express");
var router = new express.Router();
var paramController = require("../controllers/param");
router.get("/", paramController.paramList);
router.get("/:_id", paramController.paramDetail);
router.post("/", paramController.paramCreate);
router.delete("/", paramController.paramDelete);
router.put("/", paramController.paramUpdate);
module.exports = router;
