var Coordinator = require("../models/coordinator");
var debug=require("debug")("controllers/coordinator.js");
var utils = require("../utils");
exports.CoordinatorList = function (req, res, next) {
  Coordinator.find({}, function (err, listCoordinators) {
    if (err) {
      debug(err);
      return next(err);
    }
		// Successful, so render
    res.send(listCoordinators);
  });
};
exports.CoordinatorListForDeployment = function (req, res, next) {
  Coordinator.find({
    deployment: req.params.deployment
  }, function (err, listCoordinators) {
    if (err) {
      debug(err);
      return next(err);
    }
		// Successful, so render
    res.send(listCoordinators);
  });
};
exports.coordinatorDetail = function (req, res, next) {
  Coordinator.find({
    _id: req.params._id
  }, function (err, coordinator) {
    if (err) {
      debug(err);
      return next(err);
    }
		// Successful, so render
    res.send(coordinator);
  });
};
exports.coordinatorCreate = function (req, res, next) {
  req.checkBody("description", "Each coordinator needs a description").notEmpty();
  req.checkBody("deployment", "A coordinator needs to belong to a deployment").notEmpty();
  req.sanitize("description").escape();
  req.sanitize("description").trim();
  var errors = req.validationErrors();
  var coordinator = new Coordinator({
    description: req.body.description,
    added: req.body.added,
    deployment: {
      _id: req.body.deployment
    },
    active: req.body.active
  });
  utils.goSave(coordinator,res);
};
exports.coordinatorDelete = function (req, res) {
  Coordinator.findOneAndUpdate({
    _id: req.body.id
  }, {
    active: false
  }, {
    upsert: false
  }, function (err, doc) {
    if (err) {
      debug(err);
      return res.send(500, {
        error: err
      })
    }
    return res.send("Coordinator Deleted");
  });
};
exports.coordinatorUpdate = function (req, res) {
  Coordinator.findOneAndUpdate({
    _id: req.body.id
  }, {
    "deployment": req.body.deployment,
    "description": req.body.description,
    "active": req.body.active,
    "added": req.body.added,
    "device": req.body.device
  }, {
    upsert: false
  },
		function (err, doc) {
  if (err) {
    debug(err);
    return res.send(500, {
      error: err
    });
  }
  if (doc != null) {
    res.redirect(303, doc.url);
  } else {
    res.send(500, "coordinator not found");
  }
});
};
