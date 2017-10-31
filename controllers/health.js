var Health = require('../models/health')

exports.health_list = function (req, res, next) {
  Health.find({}, function (err, list_healths) {
    if (err) {
      return next(err)
    }
		// Successful, so render
    res.send(list_healths)
  })
}

exports.health_detail = function (req, res, next) {
  Health.find({
    _id: req.params.id
  }, function (err, health) {
    if (err) {
      return next(err)
    }
		// Successful, so render
    res.send(health)
  })
}
exports.health_create = function (req, res, next) {
  var health = new Health({
    description: req.body.description,
    added: req.body.added,
    active: req.body.active,
    is_admin: req.body.is_admin,
    is_config_admin: req.body.is_config_admin,
    is_billing: req.body.is_billing,
    is_reader: req.body.is_reader,
    is_cg_admin: req.body.is_cg_admin
  })
  res.redirect(303, health.url)
}
exports.health_delete = function (req, res, next) {
  Health.findOneAndUpdate({
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
    return res.send('Health Deleted')
  })
}
exports.health_update = function (req, res, next) {
  Health.findOneAndUpdate({
    _id: req.body.id
  }, {
    description: req.body.description,
    added: req.body.added,
    active: req.body.active,
    is_admin: req.body.is_admin,
    is_config_admin: req.body.is_config_admin,
    is_billing: req.body.is_billing,
    is_reader: req.body.is_reader,
    is_cg_admin: req.body.is_cg_admin
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
    res.send(500, 'Health not found')
  }
})
}
