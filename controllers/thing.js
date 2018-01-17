var Thing = require("../models/thing");
var debug=require("debug")("controllers/thing.js");

exports.thingList = function (req, res, next) {
  Thing.find({}, function (err, listThings, next) {
    if (err) {
      debug(err);
      return next(err);
    }
        // Successful, so render
    res.send(listThings);
  })
}
exports.thingListForDeployment = function (req, res, next) {
    // need to map devices back up to deployments, eventually
  Thing.find({}, function (err, listThings) {
    if (err) {
      debug(err);
      return next(err);
    }
        // Successful, so render
    res.send(listThings);
  })
}
exports.thingDetail = function (req, res, next) {
  Thing.find({
    _id: req.params._id
  }, function (err, thing) {
    if (err) {
      debug(err);
      return next(err);
    }
        // Successful, so render
    res.send(thing);
  })
}
exports.thingCreate = function (req, res, next) {
  req.checkBody("deviceid", "Each thing needs a device id").notEmpty();
  req.sanitize("deviceid").escape();
  req.sanitize("deviceid").trim();
  var errors = req.validationErrors();
  var thing = new Thing({
    deviceId: req.body.deviceId,
    description: req.body.description,
    name: req.body.name,
    pushInterval: req.body.pushInterval,
    aggregator: req.body.aggregator,
    broker: req.body.broker,
    added: req.body.added,
    active: req.body.active
  });
  thing.save(function (err) {
    if (err) {
      debug(err);
      return next(err);
    }
    res.redirect(thing.url);
  })
}
exports.thingDelete = function (req, res, next) {
  Thing.findOneAndUpdate({
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
    return res.send("Thing Deleted");
  });
}
exports.thingUpdate = function (req, res, next) {
  Thing.findOneAndUpdate({
    _id: req.body.id
  }, {
    deviceId: req.body.deviceId,
    description: req.body.description,
    name: req.body.name,
    pushInterval: req.body.pushInterval,
    aggregator: req.body.aggregator,
    broker: req.body.broker,
    added: req.body.added,
    active: req.body.active
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
}
