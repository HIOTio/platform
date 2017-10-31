var Thing = require('../models/thing')

exports.thing_list = function (req, res, next) {
  Thing.find({}, function (err, list_things, next) {
    if (err) {
      return next(err)
    }
        // Successful, so render
    res.send(list_things)
  })
}
exports.thing_list_for_deployment = function (req, res, next) {
    // need to map devices back up to deployments, eventually
  Device.find({}, function (err, list_things) {
    if (err) {
      return next(err)
    }
        // Successful, so render
    res.send(list_things)
  })
}
exports.thing_detail = function (req, res, next) {
  Thing.find({
    _id: req.params.id
  }, function (err, thing) {
    if (err) {
      return next(err)
    }
        // Successful, so render
    res.send(thing)
  })
}
exports.thing_create = function (req, res, next) {
  req.checkBody('deviceid', 'Each thing needs a device id').notEmpty()
  req.sanitize('deviceid').escape()
  req.sanitize('deviceid').trim()
  var errors = req.validationErrors()
  var thing = new Thing({
    deviceId: req.body.deviceId,
    description: req.body.description,
    name: req.body.name,
    pushInterval: req.body.pushInterval,
    aggregator: req.body.aggregator,
    broker: req.body.broker,
    added: req.body.added,
    active: req.body.active
  })
  thing.save(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect(thing.url)
  })
}
exports.thing_delete = function (req, res, next) {
  Thing.findOneAndUpdate({
    _id: req.body.id
  }, {
    active: false
  }, {
    upsert: false
  }, function (err, doc) {
    if (err) {
      next(err)
    }
    return res.send('Thing Deleted')
  })
}
exports.thing_update = function (req, res, next) {
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
            return res.send(500, {
              error: err
            })
          }
          res.redirect(303, doc.url)
        })
}
