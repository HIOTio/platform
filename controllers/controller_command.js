var ControllerCommand = require("../models/controller_command");
var debug=require("debug")("controllers/controller_command.js");
var utils = require("../utils");

exports.controllerCommandList = function (req, res, next) {
  ControllerCommand.find({}, function (err, listControllerCommands) {
    if (err) {
      debug(err);
      return next(err);
    }
		// Successful, so render
    res.send(listControllerCommands);
  });
};
exports.controllerCommandListForController = function (req, res, next) {
  ControllerCommand.find({
    controller: req.params.controller
  }, function (err, listControllerCommands) {
    if (err) {
      debug(err);
      return next(err);
    }
		// Successful, so render
    res.send(listControllerCommands);
  });
};
exports.controllerCommandDetail = function (req, res, next) {
  ControllerCommand.find({
    _id: req.params._id
  }, function (err, controllerCommand) {
    if (err) {
      debug(err);
      return next(err);
    }
		// Successful, so render
    res.send(controllerCommand);
  });
};
exports.controllerCommandCreate = function (req, res, next) {
  var controllerCommand = new ControllerCommand({
    controller: req.body.thing,
    description: req.body.description,
    params: req.body.params,
    added: req.body.added,
    name: req.body.name,
    active: req.body.active,
    id: req.body.String
  });
  utils.goSave(controllerCommand,res);
};
exports.controllerCommandDelete = function (req, res, next) {
  utils.markDeleted(ControllerCommand,req,res);
};
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
    debug(err);
    return res.send(500, {
      error: err
    });
  }
  res.redirect(303, doc.url);
});
};
