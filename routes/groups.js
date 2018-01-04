var express = require("express");
var router = new express.Router();
var groupController = require("../controllers/groups");
router.get("/", groupController.group_list);
router.get("/:id", groupController.group_detail);
router.post("/", groupController.groupCreate);
router.delete("/", groupController.groupDelete);
router.put("/", groupController.group_update);
module.exports = router;
