var DeviceModel = require("../models/device_model");
var debug=require('debug')('controllers/device_model.js');

exports.device_modelList = function (req, res, next) {
  DeviceModel.find({}, function (err, list_device_models) {
    if (err) {
      debug(err);
      return next(err);
    }
		// Successful, so render
    res.send(list_device_models);
  })
}

exports.device_makeModels = function (req, res, next) {
  console.log(req.params);
  DeviceModel.find({
    make: req.params.id
  }, function (err, deviceModel) {
    if (err) {
      debug(err);
      return next(err);
    }
		// Successful, so render
    res.send(deviceModel);
  })
}
exports.device_modelDetail = function (req, res, next) {
  console.log(req.params);
  DeviceModel.find({
    _id: req.params.id
  }, function (err, deviceModel) {
    if (err) {
      debug(err);
      return next(err);
    }
		// Successful, so render
    res.send(deviceModel);
  })
}
exports.deviceModelCreate = function (req, res, next) {
  var deviceModel = new DeviceModel({
    description: req.body.description,
    make:req.body.make,
    added: req.body.added
  })
  deviceModel.save(function (err) {
    if (err) {
      debug(err);
      return next(err);
    }
    res.redirect(deviceModel.url);
})
}
exports.device_modelDelete = function (req, res, next) {
  DeviceModel.findOneAndUpdate({
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
    return res.send("Device Model Deleted");
  });
}
exports.device_modelUpdate = function (req, res, next) {
  DeviceModel.findOneAndUpdate({
    _id: req.body.id
  }, {
    description: req.body.description,
    added: req.body.added
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
    res.send(500, "Device Model not found");
  }
});
}
