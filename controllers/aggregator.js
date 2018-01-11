var Aggregator = require("../models/aggregator");
var Device = require ("../models/device");
exports.aggregatorList = function (req, res, next) {
  Aggregator.find({}, function (err, list_aggregators) {
    if (err) {
      return next(err);
    }
		// Successful, so render
    res.send(list_aggregators);
  });
}

// TODO: get this to work by assiging devices to deployments, and querying the "device" element [Issue #8]
exports.aggergatorListForDeployment = function (req, res) {
  Aggregator.find({
    deployment: req.params.deployment
  }, function (err, list_aggregators) {
    if (err) {
      return next(err);
    }
		// Successful, so render
    res.send(list_aggregators);
  });
}
exports.aggergatorListForDevice = function (req, res,next) {
  Aggregator.find({
    device: req.params.device
  }, function (err, list_aggregators) {
    if (err) {
      return next(err);
    }
		// Successful, so render
    res.send(list_aggregators);
  });
}
exports.aggregatorDetail = function (req, res, next) {
  Aggregator.find({
    _id: req.params.id
  }, function (err, aggregator) {
    if (err) {
      return next(err);
    }
		// Successful, so render
    res.send(aggregator);
  });
}
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
  aggregator.save(function (err,doc) {
    if (err) {
      return next(err);
    }
    //successful, update device
    var device = Device.findOneAndUpdate({_id:req.body.device},{"$push":{aggregators: doc._id}},{upsert:false},
    function (err, doc) {
      if (err) {
        console.log(err);

      }
    
  });
    res.send(doc);
  });
}


exports.aggregator_fromList = function(req,res,next){
 // console.log(req.params.list)
  Aggregator.find({
    _id: {$in : JSON.parse(req.params.list)}
  })
 // .populate('handler') 
  .exec( function (err, listAggregators) {
    if (err) {
      return next(err);
    }
		// Successful, so render
    res.send(listAggregators);
  });
}
exports.aggregatorDelete = function (req, res) {
  Aggregator.findOneAndUpdate({
    _id: req.body.id
  }, {
    active: false
  }, {
    upsert: false
  }, function (err, doc) {
    if (err) {
      return res.send(500, {
        error: err
      });
    }
    return res.send("Aggregator Deleted");
  })
}
exports.aggregatorUpdate = function (req, res) {
 // console.log(req.body)
  //TODO: what to do if the _id isn't found [Issue #7]
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
        return res.send(500, {
          error: err
        });
      }
      res.redirect(303, doc.url);
    });
}

