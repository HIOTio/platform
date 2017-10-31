var Param = require('../models/param')

exports.param_list = function (req, res, next) {
  Param.find({}, function (err, list_params) {
    if (err) {
      return next(err)
    }
		// Successful, so render
    res.send(list_params)
  })
}

exports.param_detail = function (req, res, next) {
  Param.find({
    _id: req.params.id
  }, function (err, Param) {
    if (err) {
      return next(err)
    }
		// Successful, so render
    res.send(Param)
  })
}
exports.param_create = function (req, res, next) {
  var param = new Param({
    name: req.body.name,
    value: req.body.value,
    description: req.body.description,
    required: req.body.required,
    min: req.body.min,
    max: req.body.max,
    default: req.body.default
  })
  param.save(function(err){
    if(!err){
        res.redirect(303, param.url)
    }
  })
}
exports.param_delete = function (req, res, next) {
  Param.findOneAndUpdate({
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
    return res.send('Param Deleted')
  })
}
exports.param_update = function (req, res, next) {
  Param.findOneAndUpdate({
    _id: req.body.id
  }, {
    name: req.body.name,
    value: req.body.value,
    description: req.body.description,
    required: req.body.required,
    min: req.body.min,
    max: req.body.max,
    default: req.body.default
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
    res.send(500, 'Param not found')
  }
})
}
