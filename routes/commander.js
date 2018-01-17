var express = require("express");
var router = new express.Router();

var commanderController = require("../controllers/commander");

router.get("/", commanderController.commanderList);
router.get("/:_id", commanderController.commanderDetail);
router.post("/", commanderController.commanderCreate);
router.delete("/", commanderController.commanderDelete);
router.put("/", commanderController.commanderUpdate);

module.exports = router;
