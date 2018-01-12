var Handler = require("../models/handler");
var debug=require('debug')('controllers/aggregator.js');

exports.handlerList = function (req, res, next) {
  Handler.find({}, function (err, list_handlers) {
    if (err) {
      debug(err);
      return next(err);
    }
        // Successful, so render
    res.send(list_handlers);
  });
};
exports.handlerListDeployment = function (req, res, next) {
    Handler.find({
        deployment:req.params.deployment
    }, function (err, list_handlers) {
      if (err) {
        debug(err);
        return next(err);
      }
          // Successful, so render
      res.send(list_handlers);
    });
  };
exports.handlerDetail = function (req, res, next) {
  Handler.find({
    _id: req.params.id
  }, function (err, handler) {
    if (err) {
      debug(err);
      return next(err);
    }
        // Successful, so render
    res.send(handler);
  });
};
exports.handlerCreate = function (req, res, next) {
  var handler = new Handler({
    name:req.body.name,
    aggregator:req.body.aggregator,
    controller:req.body.controller,
    broker:req.body.broker,
    coordinator:req.body.coordinator,
    sensor:req.body.sensor,
    deployment: req.body.deployment,
    description: req.body.description,
    commands: req.body.commands

  });
  handler.save(function (err) {
    if (err) {
      debug(err);
      return next(err);
    }
    res.redirect(handler.url);
  });
};
exports.handlerDelete = function (req, res, next) {
  Handler.findOneAndUpdate({
    _id: req.body.id
  }, {
    active: false
  }, {
    upsert: false
  }, function (err, doc) {
    if (err) {
      debug(err);
      next(err);
    }
    return res.send("handler Deleted");
  });
};
exports.handlerUpdate = function (req, res, next) {
  Handler.findOneAndUpdate({
    _id: req.body._id
  }, {
    name:req.body.name,
    aggregator:req.body.aggregator,
    controller:req.body.controller,
    broker:req.body.broker,
    coordinator:req.body.coordinator,
    sensor:req.body.sensor,
    deployment: req.body.deployment,
    description: req.body.description,
    commands: req.body.commands
  }, {
    upsert: false
  },
        function (err, doc) {
          if (err) {
            debug(err);
            return res.send(500, {
              error: err
            })
          }
          res.redirect(303, doc.url);
        });
};
