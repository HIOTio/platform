var Role = require('../models/role')
exports.role_list = function (req, res, next) {
  Role.find({}, function (err, list_roles, next) {
    if (err) {
      return next(err)
    }
        // Successful, so render
    res.send(list_roles)
  })
}

exports.role_detail = function (req, res, next) {
  Role.findById(req.params.id, function (err, role) {
    if (err) {
      return next(err)
    }
        // Successful, so render
    res.send(role)
  })
}
exports.role_create = function (req, res, next) {
  var errors = req.validationErrors()
  var role = new Role({
    description: req.body.description,
    name: req.body.name,
    add_deployment: req.body.add_deployment,
    add_user: req.body.add_user,
    control_devices: req.body.control_devices
  })
  role.save(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect(role.url)
  })
}
exports.role_delete = function (req, res, next) {
  Role.findOneAndUpdate({
    _id: req.body.id
  }, {
    active: false
  }, {
    upsert: false
  }, function (err, doc) {
    if (err) {
      next(err)
    }
    return res.send('Role Deleted')
  })
}
exports.role_update = function (req, res, next) {
  Role.findOneAndUpdate({
    _id: req.body.id
  }, {
    description: req.body.description,
    name: req.body.name,
    add_deployment: req.body.add_deployment,
    add_user: req.body.add_user,
    control_devices: req.body.control_devices
  }, {
    upsert: false
  },
        function (err, doc) {
          if (err) {
            return res.send(500, {
              error: err
            })
          }
          res.redirect(303, doc.url)
        })
}
