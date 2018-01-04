var SensorReading = require("../models/sensor_reading");

exports.sensorReadingList = function (req, res, next) {
  SensorReading.find({}, function (err, listSensorReadings, next) {
    if (err) {
      return next(err);
    }
		// Successful, so render
    res.send(listSensorReadings);
  });
};
exports.sensorReadingList_for_sensor = function (req, res, next) {
  SensorReading.find({
    sensor_id: req.params.sensor_id
  }, function (err, listSensorReadings) {
    if (err) {
      return next(err);
    }
		// Successful, so render
    res.send(listSensorReadings);
  });
};
exports.sensor_reading_detail = function (req, res, next) {
  SensorReading.findById(req.params.id, function (err, sensorReading) {
    if (err) {
      return next(err);
    }
		// Successful, so render
    res.send(sensorReading);
  });
};
