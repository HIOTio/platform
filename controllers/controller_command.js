var ControllerCommand = require("../models/controller_command");

exports.controllerCommandList = function (req, res, next) {
  ControllerCommand.find({}, function (err, list_controller_commands) {
    if (err) {
      return next(err);
    }
		// Successful, so render
    res.send(list_controller_commands);
  });
}
exports.controllerCommandListForController = function (req, res, next) {
  ControllerCommand.find({
    controller: req.params.controller
  }, function (err, list_controller_commands) {
    if (err) {
      return next(err);
    }
		// Successful, so render
    res.send(list_controller_commands);
  });
}
exports.controllerCommandDetail = function (req, res, next) {
  ControllerCommand.find({
    _id: req.params.id
  }, function (err, controller_command) {
    if (err) {
      return next(err);
    }
		// Successful, so render
    res.send(controller_command);
  });
}
exports.controller_commandCreate = function (req, res, next) {
  var controllerCommand = new ControllerCommand({
    controller: req.body.thing,
    description: req.body.description,
    params: req.body.params,
    added: req.body.added,
    name: req.body.name,
    active: req.body.active,
    id: req.body.String
  });
  controllerCommand.save(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(controllerCommand.url);
  });
}
exports.controllerCommandDelete = function (req, res, next) {
  ControllerCommand.findOneAndUpdate({
    _id: req.body.id
  }, {
    active: false
  }, {
    upsert: false
  }, function (err, doc) {
    if (err) {
      next(err);
    }
    return res.sendStatus(200);
  });
}
exports.controllerCommandUpdate = function (req, res, next) {
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
    });
  }
  res.redirect(303, doc.url);
});
}
