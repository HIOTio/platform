var express = require("express");
var router = new express.Router();
var publicationController = require("../controllers/publication");
router.get("/", publicationController.publicationList);
router.get("/:_id", publicationController.publicationDetail);
router.post("/", publicationController.publicationCreate);
router.delete("/", publicationController.publicationDelete);
router.put("/", publicationController.publicationUpdate);
module.exports = router;
