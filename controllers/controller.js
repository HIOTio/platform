var Controller = require("../models/controller");
var debug=require("debug")("controllers/controller.js");
var utils = require("../utils");

exports.controllerList = function (req, res, next) {
  Controller.find({}, function (err, listControllers) {
    if (err) {
      debug(err);
      return next(err);
    }
    // Successful, so render
    res.send(listControllers);
  });
};
exports.controllerListForThing = function (req, res, next) {
  Controller.find({
    thing: req.params.thing,
  }, function (err, listControllers) {
    if (err) {
      debug(err);
      return next(err);
    }
    // Successful, so render
    res.send(listControllers);
  });
};
exports.controllerDetail = function (req, res, next) {
 utils.details(Controller, req, res);
};
exports.controllerCreate = function (req, res, next) {
  var controller = new Controller({
    description: req.body.description,
    deployment: req.body.deployment,
    controllerId: req.body.controllerId,
    name: req.body.name,
    channel: req.body.channel,
    handler: req.body.handler,
    thing: req.body.thing,
    added: req.body.added,
    active: req.body.active,
  });
  utils.goSave(controller,res);
};
exports.controllerDelete = function (req, res, next) {
  utils.markDeleted(Controller,req,res);
};
exports.controllerUpdate = function (req, res, next) {
  Controller.findOneAndUpdate({
    _id: req.body._id,
  }, {
    description: req.body.description,
    deployment: req.body.deployment,
    controllerId: req.body.controllerId,
    name: req.body.name,
    channel: req.body.channel,
    handler: req.body.handler,
    thing: req.body.thing,
    added: req.body.added,
    active: req.body.active,
  }, {
    upsert: false,
  },
  function (err, doc) {
    if (err) {
      debug(err);
      return res.send(500, {
        error: err,
      });
    }
    res.redirect(303, doc.url);
  });
};
