var Coordinator = require("../models/coordinator");

exports.CoordinatorList = function (req, res, next) {
  Coordinator.find({}, function (err, list_coordinators) {
    if (err) {
      return next(err);
    }
		// Successful, so render
    res.send(list_coordinators);
  })
}
exports.CoordinatorListForDeployment = function (req, res, next) {
  Coordinator.find({
    deployment: req.params.deployment
  }, function (err, list_coordinators) {
    if (err) {
      return next(err);
    }
		// Successful, so render
    res.send(list_coordinators);
  });
}
exports.coordinatorDetail = function (req, res) {
  Coordinator.find({
    _id: req.params.id
  }, function (err, coordinator) {
    if (err) {
      return next(err);
    }
		// Successful, so render
    res.send(coordinator);
  });
}
exports.coordinatorCreate = function (req, res, next) {
  req.checkBody("description", "Each coordinator needs a description").notEmpty();
  req.checkBody("deployment", "A coordinator needs to belong to a deployment").notEmpty();
  req.sanitize("description").escape();
  req.sanitize("description").trim();
  var errors = req.validationErrors();
 // console.log(req.body)
  var coordinator = new Coordinator({
    description: req.body.description,
    added: req.body.added,
    deployment: {
      _id: req.body.deployment
    },
    active: req.body.active
  });
  coordinator.save(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(coordinator.url);
  });
}
exports.coordinatorDelete = function (req, res) {
  Coordinator.findOneAndUpdate({
    _id: req.body.id
  }, {
    active: false
  }, {
    upsert: false
  }, function (err, doc) {
    if (err) {
      return res.send(500, {
        error: err
      })
    }
    return res.send("Coordinator Deleted");
  })
}
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
    return res.send(500, {
      error: err
    });
  }
  if (doc != null) {
    res.redirect(303, doc.url);
  } else {
    res.send(500, "coordinator not found");
  }
})
}
