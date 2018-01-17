var DeviceMake = require("../models/device_make");
var debug=require("debug")("controllers/device_make.js");

exports.deviceMakeList = function (req, res, next) {
  DeviceMake.find({}, function (err, listDeviceMakes) {
    if (err) {
      debug(err);
      return next(err);
    }
		// Successful, so render
    res.send(listDeviceMakes);
  });
};

exports.deviceMakeDetail = function (req, res, next) {
  DeviceMake.find({
    _id: req.params._id
  }, function (err, deviceMake) {
    if (err) {
      debug(err);
      return next(err);
    }
		// Successful, so render
    res.send(deviceMake);
  });
};
exports.deviceMakeCreate = function (req, res, next) {
  var deviceMake = new DeviceMake({
    description: req.body.description,
    added: req.body.added
  });
  deviceMake.save(function (err) {
    if (err) {
      debug(err);
      return next(err);
    }
    res.redirect(deviceMake.url);
});
};
exports.deviceMakeDelete = function (req, res) {
  DeviceMake.findOneAndUpdate({
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
    return res.send("Device Make Deleted");
  });
};
exports.deviceMakeUpdate = function (req, res) {
  DeviceMake.findOneAndUpdate({
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
    res.send(500, "Device Make not found");
  }
});
};
