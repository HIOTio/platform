var ControllerCommand = require('../models/controller_command')

exports.controller_command_list = function (req, res, next) {
  ControllerCommand.find({}, function (err, list_controller_commands) {
    if (err) {
      return next(err)
    }
		// Successful, so render
    res.send(list_controller_commands)
  })
}
exports.controller_command_list_for_controller = function (req, res, next) {
  ControllerCommand.find({
    controller: req.params.controller
  }, function (err, list_controller_commands) {
    if (err) {
      return next(err)
    }
		// Successful, so render
    res.send(list_controller_commands)
  })
}
exports.controller_command_detail = function (req, res, next) {
  ControllerCommand.find({
    _id: req.params.id
  }, function (err, controller_command) {
    if (err) {
      return next(err)
    }
		// Successful, so render
    res.send(controller_command)
  })
}
exports.controller_command_create = function (req, res, next) {
  var controllerCommand = new ControllerCommand({
    controller: req.body.thing,
    description: req.body.description,
    params: req.body.params,
    added: req.body.added,
    name: req.body.name,
    active: req.body.active,
    id: req.body.String
  })
  controllerCommand.save(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect(controllerCommand.url)
  })
}
exports.controller_command_delete = function (req, res, next) {
  ControllerCommand.findOneAndUpdate({
    _id: req.body.id
  }, {
    active: false
  }, {
    upsert: false
  }, function (err, doc) {
    if (err) {
      next(err)
    }
    return res.send('Controller Command Deleted')
  })
}
exports.controller_command_update = function (req, res, next) {
  ControllerCommand.findOneAndUpdate({
    _id: req.body.id
  }, {
    controller: req.body.controller,
    description: req.body.description,
    name: req.body.name,
    params: req.body.params,
    added: req.body.added,
    active: req.body.active,
    id: req.body.id
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
