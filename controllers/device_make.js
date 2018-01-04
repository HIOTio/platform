var DeviceMake = require("../models/device_make");

exports.device_makeList = function (req, res, next) {
  DeviceMake.find({}, function (err, listDeviceMakes) {
    if (err) {
      return next(err);
    }
		// Successful, so render
    res.send(listDeviceMakes);
  });
};

exports.device_makeDetail = function (req, res, next) {
  DeviceMake.find({
    _id: req.params.id
  }, function (err, deviceMake) {
    if (err) {
      return next(err);
    }
		// Successful, so render
    res.send(deviceMake);
  });
};
exports.device_makeCreate = function (req, res, next) {
  var deviceMake = new DeviceMake({
    description: req.body.description,
    added: req.body.added
  })
  deviceMake.save(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(deviceMake.url);
});
};
exports.device_makeDelete = function (req, res) {
  DeviceMake.findOneAndUpdate({
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
    return res.send("Device Make Deleted");
  });
};
exports.device_makeUpdate = function (req, res) {
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
