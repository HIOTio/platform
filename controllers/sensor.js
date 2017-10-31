var Sensor = require('../models/sensor')
exports.sensor_list = function (req, res, next) {
  Sensor.find({}, function (err, list_sensors, next) {
    if (err) {
      return next(err)
    }
		// Successful, so render
    res.send(list_sensors)
  })
}
exports.sensor_list_for_deployment = function (req, res, next) {
	// need to map devices back up to deployments, eventually
  Sensor.find({}, function (err, list_sensors) {
    if (err) {
      return next(err)
    }
		// Successful, so render
    res.send(list_sensors)
  })
}
exports.sensor_detail = function (req, res, next) {
  Sensor.findById(req.params.id, function (err, sensor) {
    if (err) {
      return next(err)
    }
		// Successful, so render
    res.send(sensor)
  })
}
exports.sensor_create = function (req, res, next) {
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
  })
  sensor.save(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect(sensor.url)
  })
}
exports.sensor_delete = function (req, res, next) {
  Sensor.findOneAndUpdate({
    _id: req.body.id
  }, {
    active: false
  }, {
    upsert: false
  }, function (err, doc) {
    if (err) {
      next(err)
    }
    return res.send('Sensor Deleted')
  })
}
exports.sensor_update = function (req, res, next) {
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
    return res.send(500, {
      error: err
    })
  }
  res.redirect(303, doc.url)
})
}
