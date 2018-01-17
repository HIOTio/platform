var DeviceConfiguration = require("../models/device_configuration");
var debug=require("debug")("controllers/device_configuration.js");
var utils = require("../utils");
exports.deviceConfigurationList = function (req, res, next) {
  DeviceConfiguration.find({}, function (err, listDeviceConfigurations) {
    if (err) {
      debug(err);
      return next(err);
    }
		// Successful, so render
    res.send(listDeviceConfigurations);
  });
};

exports.deviceConfigurationDetail = function (req, res, next) {
  DeviceConfiguration.find({
    _id: req.params._id
  }, function (err, deviceConfiguration) {
    if (err) {
      debug(err);
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
    ipAddress: req.body.ipAddress
  });
  utils.goSave(deviceConfiguration, res);
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
      debug(err);
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
    ipAddress: req.body.ipAddress
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
    res.send(500, "Device configuration record not found");
  }
});
};
