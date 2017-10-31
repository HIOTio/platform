var Aggregator = require('../models/aggregator')

exports.aggregator_list = function (req, res) {
  Aggregator.find({}, function (err, list_aggregators) {
    if (err) {
      return next(err)
    }
		// Successful, so render
    res.send(list_aggregators)
  })
}

// TODO: get this to work by assiging devices to deployments, and querying the "device" element
exports.aggergator_list_for_deployment = function (req, res) {
  Aggregator.find({
    deployment: req.params.deployment
  }, function (err, list_aggregators) {
    if (err) {
      return next(err)
    }
		// Successful, so render
    res.send(list_aggregators)
  })
}
exports.aggregator_detail = function (req, res) {
  Aggregator.find({
    _id: req.params.id
  }, function (err, aggregator) {
    if (err) {
      return next(err)
    }
		// Successful, so render
    res.send(aggregator)
  })
}
exports.aggregator_create = function (req, res, next) {
  var aggregator = new Aggregator({
    handler: req.body.handler,
    name: req.body.name,
    channel:req.body.channel,
    topics: req.body.topics,
    description:req.body.description,
    handler:req.body.handler,
    poll:req.body.poll,
    deployment:req.body.deployment,
    active:req.body.active
  })
  aggregator.save(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect(aggregator.url)
  })
}


exports.aggregator_fromList = function(req,res,next){
 // console.log(req.params.list)
  Aggregator.find({
    _id: {$in : JSON.parse(req.params.list)}
  })
 // .populate('handler') 
  .exec( function (err, list_aggregators) {
    if (err) {
      return next(err)
    }
		// Successful, so render
    res.send(list_aggregators)
  })
}
exports.aggregator_delete = function (req, res) {
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
      })
    }
    return res.send('Aggregator Deleted')
  })
}
exports.aggregator_update = function (req, res) {
 // console.log(req.body)
  //TODO: what to do if the _id isn't found
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
        })
      }
      res.redirect(303, doc.url)
    })
}

