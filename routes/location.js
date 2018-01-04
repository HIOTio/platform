var express = require("express");
var router = new express.Router();
var locationController = require("../controllers/location");
router.get("/", locationController.location_list);
router.get("/:id", locationController.location_detail);
router.get("/deployment/:deployment", locationController.location_list_by_deployment);
router.post("/", locationController.locationCreate);
router.delete("/", locationController.locationDelete);
router.put("/", locationController.location_update);
module.exports = router;
