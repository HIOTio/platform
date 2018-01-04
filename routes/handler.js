var express = require("express");
var router = new express.Router();

var handlerController = require("../controllers/handler");

router.get("/", handlerController.handlerList);
router.get("/deployment/:deployment", handlerController.handlerListDeployment);
router.get("/:id", handlerController.handlerDetail);
router.post("/", handlerController.handlerCreate);
router.delete("/", handlerController.handlerDelete);
router.put("/", handlerController.handlerUpdate);

module.exports = router;
