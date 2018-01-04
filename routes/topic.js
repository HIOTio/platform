var express = require("express");
var router = new express.Router();
var topicController = require("../controllers/topic");
router.get("/", topicController.topicList);
router.get("/:id", topicController.topicDetail);
router.post("/", topicController.topicCreate);
router.delete("/", topicController.topicDelete);
router.put("/", topicController.topicUpdate);
module.exports = router;