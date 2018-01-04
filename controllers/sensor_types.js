var Sensor = require("../models/sensor_types");

exports.sensorTypesList = function (req, res, next) {
  Sensor.find({}, function (err, list_sensorTypes) {
    if (err) {
      return next(err);
    }
		// Successful, so render
    res.send(list_sensorTypes);
  });
};

exports.sensorTypesDetail = function (req, res, next) {
  Sensor.find({
    _id: req.body.id
  }, function (err, Sensor) {
    if (err) {
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
