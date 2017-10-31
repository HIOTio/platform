var Sensor = require('../models/sensor_types')

exports.sensor_types_list = function (req, res, next) {
  Sensor.find({}, function (err, list_sensor_types) {
    if (err) {
      return next(err)
    }
		// Successful, so render
    res.send(list_sensor_types)
  })
}

exports.sensor_types_detail = function (req, res, next) {
  Sensor.find({
    _id: req.body.id
  }, function (err, Sensor) {
    if (err) {
      return next(err)
    }
		// Successful, so render
    res.send(Sensor)
  })
}
exports.sensor_types_create = function (req, res, next) {
  var sensor_types = new Sensor({
    description: req.body.description,
    name: req.body.name,
    active: req.body.active,
    added: req.body.added,
    defaultPushInterval: req.body.defaultPushInterval
  })
  sensor_types.save(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect(sensor_types.url)
  })
}
exports.sensor_types_delete = function (req, res, next) {
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
      })
    }
    return res.send('Sensor Deleted')
  })
}
exports.sensor_types_update = function (req, res, next) {
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
    })
  }
  if (doc != null) {
    res.redirect(303, doc.url)
  } else {
    res.send(500, 'Sensor not found')
  }
})
}
