var DeviceConfiguration = require('../models/device_configuration')

exports.device_configuration_list = function (req, res, next) {
  DeviceConfiguration.find({}, function (err, list_device_configurations) {
    if (err) {
      return next(err)
    }
		// Successful, so render
    res.send(list_device_configurations)
  })
}

exports.device_configuration_detail = function (req, res) {
  DeviceConfiguration.find({
    _id: req.params.id
  }, function (err, device_configuration) {
    if (err) {
      return next(err)
    }
		// Successful, so render
    res.send(device_configuration)
  })
}
exports.device_configuration_create = function (req, res, next) {
  var deviceConfiguration = new DeviceConfiguration({
    description: req.body.description,
    added: req.body.added,
    ip_address: req.body.ip_address
  })
  res.redirect(303, doc.url)
}
exports.device_configuration_delete = function (req, res) {
  DeviceConfiguration.findOneAndUpdate({
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
    return res.send('Device Configuration Deleted')
  })
}
exports.device_configuration_update = function (req, res) {
  DeviceConfiguration.findOneAndUpdate({
    _id: req.body.id
  }, {
    description: req.body.description,
    added: req.body.added,
    ip_address: req.body.ip_address
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
    res.send(500, 'Device configuration record not found')
  }
})
}
