var DeviceMake = require('../models/device_make')

exports.device_make_list = function (req, res) {
  DeviceMake.find({}, function (err, list_device_makes) {
    if (err) {
      return next(err)
    }
		// Successful, so render
    res.send(list_device_makes)
  })
}

exports.device_make_detail = function (req, res) {
  DeviceMake.find({
    _id: req.params.id
  }, function (err, device_make) {
    if (err) {
      return next(err)
    }
		// Successful, so render
    res.send(device_make)
  })
}
exports.device_make_create = function (req, res, next) {
  var deviceMake = new DeviceMake({
    description: req.body.description,
    added: req.body.added
  })
  deviceMake.save(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect(deviceMake.url)
})
}
exports.device_make_delete = function (req, res) {
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
      })
    }
    return res.send('Device Make Deleted')
  })
}
exports.device_make_update = function (req, res) {
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
    })
  }
  if (doc != null) {
    res.redirect(303, doc.url)
  } else {
    res.send(500, 'Device Make not found')
  }
})
}
