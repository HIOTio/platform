var CoordinatorGroup = require("../models/coordinator_groups");
var debug=require("debug")("controllers/coordinator_groups.js");

exports.coordinatorGroupList = function (req, res, next) {
  CoordinatorGroup.find({}, function (err, listCoordinatorGroups) {
    if (err) {debug(err);
      return next(err);
    }
		// Successful, so render
    res.send(listCoordinatorGroups);
  });
};
exports.coordinatorGroupListForDeployment = function (req, res, next) {
  CoordinatorGroup.find({
    deployment: req.params.deployment
  }, function (err, listCoordinatorGroups) {
    if (err) {
      debug(err);
      return next(err);
    }
		// Successful, so render
    res.send(listCoordinatorGroups);
  });
};
exports.coordinatorGroupDetail = function (req, res, next) {
  CoordinatorGroup.find({
    _id: req.params._id
  }, function (err, coordinatorGroup) {
    if (err) {
      debug(err);
      return next(err);
    }
		// Successful, so render
    res.send(coordinatorGroup);
  });
};
exports.coordinatorGroupCreate = function (req, res, next) {
  var coordinatorGroup = new CoordinatorGroup({
    description: req.body.description,
    name: req.body.name,
    active: req.body.active,
    added: req.body.added,
    calculation: req.body.calculation,
    sensortype: req.body.sensorType,
    sensors: req.body.sensors
  })
  res.redirect(303, coordinatorGroup.url);
};
exports.coordinatorGroupDelete = function (req, res) {
  CoordinatorGroup.findOneAndUpdate({
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
    return res.send("Coordinator Group Deleted");
  })
};
exports.coordinatorGroupUpdate = function (req, res) {
  CoordinatorGroup.findOneAndUpdate({
    _id: req.body.id
  }, {
    description: req.body.description,
    name: req.body.name,
    active: req.body.active,
    added: req.body.added,
    calculation: req.body.calculation,
    sensortype: req.body.sensor_type,
    sensors: req.body.sensors
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
    res.send(500, "coordinator group not found");
  }
});
};
