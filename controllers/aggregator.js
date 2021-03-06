var Aggregator = require("../models/aggregator");
var debug=require("debug")("controllers/aggregator.js");
var Device = require ("../models/device");
var utils = require("../utils");
exports.aggregatorList = function (req, res, next) {
  Aggregator.find({}, function (err, listAggregators) {
    if (err) {
      debug(err);
      return next(err);
    }
		// Successful, so render
    res.send(listAggregators);
  });
};

// TODO: get this to work by assiging devices to deployments, and querying the "device" element [Issue #8]
exports.aggergatorListForDeployment = function (req, res, next) {
  Aggregator.find({
    deployment: req.params.deployment
  }, function (err, listAggregators) {
    if (err) {
      debug(err);
      return next(err);
    }
		// Successful, so render
    res.send(listAggregators);
  });
};
exports.aggergatorListForDevice = function (req, res,next) {
  Aggregator.find({
    device: req.params.device
  }, function (err, listAggregators) {
    if (err) {
      debug(err);
      return next(err);
    }
		// Successful, so render
    res.send(listAggregators);
  });
};
exports.aggregatorDetail = function (req, res, next) {
  Aggregator.find({
    _id: req.params._id
  }, function (err, aggregator) {
    if (err) {
      debug(err);
      return next(err);
    }
		// Successful, so render
    res.send(aggregator);
  });
};
exports.aggregatorCreate = function (req, res, next) {
  var aggregator = new Aggregator({
    handler: req.body.handler,
    name: req.body.name,
    channel:req.body.channel,
    topics: req.body.topics,
    description:req.body.description,
    poll:req.body.poll,
    deployment:req.body.deployment,
    active:req.body.active,
    device: req.body.device
  });
  utils.goSave(aggregator, res);
};


exports.aggregatorFromList = function(req,res,next){
  Aggregator.find({
    _id: {$in : JSON.parse(req.params.list)}
  })
 // .populate("handler") 
  .exec( function (err, listAggregators) {
    if (err) {
      debug(err);
      return next(err);
    }
		// Successful, so render
    res.send(listAggregators);
  });
};
exports.aggregatorDelete = function (req, res) {
  Aggregator.findOneAndUpdate({
    _id: req.body.id
  }, {
    active: false
  }, {
    upsert: false
  }, function (err, doc) {
    if (err) {
      debug(err);
      return res.send(500, {
        error: err
      });
    }
    return res.send("Aggregator Deleted");
  });
};
exports.aggregatorUpdate = function (req, res) {
  //TODO: what to do if the _id isn"t found [Issue #7]
  Aggregator.findOneAndUpdate({
    _id: req.body._id
  }, {
    deployment: req.body.deployment,
    name: req.body.name,
    description: req.body.description,
    topic: req.body.topic,
    handler: req.body.handler
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
