var Sensor = require("../models/sensor");
var debug=require("debug")("controllers/sensor.js");
exports.sensorList = function (req, res, next) {
  Sensor.find({}, function (err, listSensors, next) {
    if (err) {
      debug(err);
      return next(err);
    }
		// Successful, so render
    res.send(listSensors);
  });
};
exports.sensorListForDeployment = function (req, res, next) {
	// need to map devices back up to deployments, eventually
  Sensor.find({deployment: req.params.deployment}, function (err, listSensors) {
    if (err) {
      debug(err);
      return next(err);
    }
		// Successful, so render
    res.send(listSensors);
  });
};
exports.sensorDetail = function (req, res, next) {
  Sensor.findById(req.params._id, function (err, sensor) {
    if (err) {
      debug(err);
      return next(err);
    }
		// Successful, so render
    res.send(sensor);
  });
};
exports.sensorCreate = function (req, res, next) {
  var sensor = new Sensor({
    id: req.body.id,
    name: req.body.name,
    channel: req.body.channel,
    description: req.body.description,
    handler: req.body.handler,
    poll: 60000,
    config: req.body.config,
    location: req.body.location,
    active: req.body.active,
    sensortype: req.body.sensortype
  });
  sensor.save(function (err) {
    if (err) {
      debug(err);
      return next(err);
    }
    res.redirect(sensor.url);
  });
};
exports.sensorDelete = function (req, res, next) {
  Sensor.findOneAndUpdate({
    _id: req.body.id
  }, {
    active: false
  }, {
    upsert: false
  }, function (err, doc) {
    if (err) {
      debug(err);
      next(err);
    }
    return res.send("Sensor Deleted");
  });
};
exports.sensorUpdate = function (req, res, next) {
  Sensor.findOneAndUpdate({
    _id: req.body.id
  }, {
    id: req.body.id,
    name: req.body.name,
    channel: req.body.channel,
    description: req.body.description,
    handler: req.body.handler,
    poll: 60000,
    config: req.body.config,
    location: req.body.location,
    active: req.body.active,
    sensortype: req.body.sensortype
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
  res.send(doc);
});
};
