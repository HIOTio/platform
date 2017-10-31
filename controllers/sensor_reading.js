var SensorReading = require('../models/sensor_reading')

exports.sensor_reading_list = function (req, res, next) {
  SensorReading.find({}, function (err, list_sensor_readings, next) {
    if (err) {
      return next(err)
    }
		// Successful, so render
    res.send(list_sensor_readings)
  })
}
exports.sensor_reading_list_for_sensor = function (req, res, next) {
  SensorReading.find({
    sensor_id: req.params.sensor_id
  }, function (err, list_sensor_readings) {
    if (err) {
      return next(err)
    }
		// Successful, so render
    res.send(list_sensor_readings)
  })
}
exports.sensor_reading_detail = function (req, res, next) {
  SensorReading.findById(req.params.id, function (err, sensor_reading) {
    if (err) {
      return next(err)
    }
		// Successful, so render
    res.send(sensor_reading)
  })
}
