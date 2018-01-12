var SensorReading = require("../models/sensor_reading");
var debug=require("debug")("controllers/aggrsensor_readingegator.js");

exports.sensorReadingList = function (req, res, next) {
  SensorReading.find({}, function (err, listSensorReadings, next) {
    if (err) {
      debug(err);
      return next(err);
    }
		// Successful, so render
    res.send(listSensorReadings);
  });
};
exports.sensorReadingListForSensor = function (req, res, next) {
  SensorReading.find({
    sensor_id: req.params.sensor_id
  }, function (err, listSensorReadings) {
    if (err) {
      debug(err);
      return next(err);
    }
		// Successful, so render
    res.send(listSensorReadings);
  });
};
exports.sensorReadingDetail = function (req, res, next) {
  SensorReading.findById(req.params.id, function (err, sensorReading) {
    if (err) {
      debug(err);
      return next(err);
    }
		// Successful, so render
    res.send(sensorReading);
  });
};
