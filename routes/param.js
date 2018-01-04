var express = require("express");
var router = new express.Router();
var paramController = require("../controllers/param");
router.get("/", paramController.param_list);
router.get("/:id", paramController.paramDetail);
router.post("/", paramController.paramCreate);
router.delete("/", paramController.paramDelete);
router.put("/", paramController.param_update);
module.exports = router;
