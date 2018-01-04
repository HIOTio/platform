var express = require("express");
var router = new express.Router();
var subscriptionController = require("../controllers/subscription");
router.get("/", subscriptionController.subscription_list);
router.get("/:id", subscriptionController.subscription_detail);
router.post("/", subscriptionController.subscriptioCreate);
router.delete("/", subscriptionController.subscriptionDelete);
router.put("/", subscriptionController.subscription_update);
module.exports = router;
