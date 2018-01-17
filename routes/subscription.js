var express = require("express");
var router = new express.Router();
var subscriptionController = require("../controllers/subscription");
router.get("/", subscriptionController.subscriptionList);
router.get("/:_id", subscriptionController.subscriptionDetail);
router.post("/", subscriptionController.subscriptioCreate);
router.delete("/", subscriptionController.subscriptionDelete);
router.put("/", subscriptionController.subscriptionUpdate);
module.exports = router;
