var express = require("express");
var router = new express.Router();
var groupController = require("../controllers/groups");
router.get("/", groupController.groupList);
router.get("/:_id", groupController.groupDetail);
router.post("/", groupController.groupCreate);
router.delete("/", groupController.groupDelete);
router.put("/", groupController.groupUpdate);
module.exports = router;
