var DeviceModel = require('../models/device_model')

exports.device_model_list = function (req, res, next) {
  DeviceModel.find({}, function (err, list_device_models) {
    if (err) {
      return next(err)
    }
		// Successful, so render
    res.send(list_device_models)
  })
}

exports.device_model_detail = function (req, res, next) {
  DeviceModel.find({
    _id: req.params.id
  }, function (err, device_model) {
    if (err) {
      return next(err)
    }
		// Successful, so render
    res.send(device_model)
  })
}
exports.device_model_create = function (req, res, next) {
  var deviceModel = new DeviceModel({
    description: req.body.description,
    make:req.body.make,
    added: req.body.added
  })
  deviceModel.save(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect(deviceModel.url)
})
}
exports.device_model_delete = function (req, res, next) {
  DeviceModel.findOneAndUpdate({
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
    return res.send('Device Model Deleted')
  })
}
exports.device_model_update = function (req, res, next) {
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
    return res.send(500, {
      error: err
    })
  }
  if (doc != null) {
    res.redirect(303, doc.url)
  } else {
    res.send(500, 'Device Model not found')
  }
})
}
