var Sensor = require("../models/sensor_types");
var debug=require("debug")("controllers/sensor_types.js");
exports.sensorTypesList = function (req, res, next) {
  Sensor.find({}, function (err, listSensorTypes) {
    if (err) {
      debug(err);
      return next(err);
    }
		// Successful, so render
    res.send(listSensorTypes);
  });
};

exports.sensorTypesDetail = function (req, res, next) {
  Sensor.find({
    _id: req.body.id
  }, function (err, Sensor) {
    if (err) {
      debug(err);
      return next(err);
    }
		// Successful, so render
    res.send(Sensor);
  });
};
exports.sensorTypesCreate = function (req, res, next) {
  var sensorTypes = new Sensor({
    description: req.body.description,
    name: req.body.name,
    active: req.body.active,
    added: req.body.added,
    defaultPushInterval: req.body.defaultPushInterval
  })
  sensorTypes.save(function (err) {
    if (err) {
      debug(err);
      return next(err);
    }
    res.redirect(sensorTypes.url);
  });
};
exports.sensorTypesDelete = function (req, res, next) {
  Sensor.findOneAndUpdate({
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
      });
    }
    return res.send("Sensor Deleted");
  });
};
exports.sensorTypesUpdate = function (req, res, next) {
  Sensor.findOneAndUpdate({
    _id: req.body.id
  }, {
    description: req.body.description,
    name: req.body.name,
    active: req.body.active,
    added: req.body.added,
    defaultPushInterval: req.body.defaultPushInterval
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
    res.send(500, "Sensor not found");
  }
});
};
