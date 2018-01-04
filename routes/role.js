var express = require("express");
var router = new express.Router();

var roleController = require("../controllers/role");
router.get("/", roleController.roleList);
router.get("/:id", roleController.roleDetail);
router.post("/", roleController.roleCreate);
router.delete("/", roleController.roleDelete);
router.put("/", roleController.roleUpdate);

module.exports = router;
