var express = require("express");
var router = new express.Router();

var roleController = require("../controllers/role");
router.get("/", roleController.role_list);
router.get("/:id", roleController.role_detail);
router.post("/", roleController.roleCreate);
router.delete("/", roleController.roleDelete);
router.put("/", roleController.role_update);

module.exports = router;
