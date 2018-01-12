var Controller = require("../models/controller");
var debug=require("debug")("controllers/controller.js");

exports.controllerList = function (req, res, next) {
  Controller.find({}, function (err, listControllers) {
    if (err) {
      debug(err);
      return next(err);
    }
    // Successful, so render
    res.send(listControllers);
  });
}
exports.controllerListForThing = function (req, res, next) {
  Controller.find({
    thing: req.params.thing,
  }, function (err, list_controllers) {
    if (err) {
      debug(err);
      return next(err);
    }
    // Successful, so render
    res.send(list_controllers);
  });
}
exports.controllerDetail = function (req, res, next) {
  Controller.find({
    _id: req.params.id,
  }, function (err, controller) {
    if (err) {
      debug(err);
      return next(err)
    }
    // Successful, so render
    res.send(controller)
  });
}
exports.controllerCreate = function (req, res, next) {
  req.checkBody("thing", "Each controller needs to belong to a valid Thing").notEmpty()
  req.sanitize("thing").escape()
  req.sanitize("thing").trim()
  var errors = req.validationErrors()
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
  })
  controller.save(function (err) {
    if (err) {
      debug(err);
      return next(err);
    }
    res.redirect(controller.url);
  });
}
exports.controllerDelete = function (req, res, next) {
  Controller.findOneAndUpdate({
    _id: req.body.id,
  }, {
    active: false,
  }, {
    upsert: false,
  }, function (err, doc) {
    if (err) {
      debug(err);
      next(err);
    }
    return res.send("Controller Deleted");
  });
}
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
}
