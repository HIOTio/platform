var DeviceConfiguration = require("../models/device_configuration");

exports.deviceConfigurationList = function (req, res, next) {
  DeviceConfiguration.find({}, function (err, listDeviceConfigurations) {
    if (err) {
      return next(err);
    }
		// Successful, so render
    res.send(listDeviceConfigurations);
  });
};

exports.deviceConfigurationDetail = function (req, res, next) {
  DeviceConfiguration.find({
    _id: req.params.id
  }, function (err, deviceConfiguration) {
    if (err) {
      return next(err);
    }
		// Successful, so render
    res.send(deviceConfiguration);
  });
};
exports.deviceConfigurationCreate = function (req, res, next) {
  var deviceConfiguration = new DeviceConfiguration({
    description: req.body.description,
    added: req.body.added,
    ip_address: req.body.ip_address
  });
  deviceConfiguration.save(function (err,conf) {
    if (err) {
      return next(err);
    }
    res.redirect(conf.url);
  });
};
exports.deviceConfigurationDelete = function (req, res) {
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
      });
    }
    return res.send("Device Configuration Deleted");
  });
};
exports.deviceConfigurationUpdate = function (req, res) {
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
    });
  }
  if (doc != null) {
    res.redirect(303, doc.url);
  } else {
    res.send(500, "Device configuration record not found");
  }
});
};
