var CoordinatorGroup = require('../models/coordinator_groups')

exports.coordinator_group_list = function (req, res) {
  CoordinatorGroup.find({}, function (err, list_coordinator_groups) {
    if (err) {
      return next(err)
    }
		// Successful, so render
    res.send(list_coordinator_groups)
  })
}
exports.coordinator_group_list_for_deployment = function (req, res) {
  CoordinatorGroup.find({
    deployment: req.params.deployment
  }, function (err, list_coordinator_groups) {
    if (err) {
      return next(err)
    }
		// Successful, so render
    res.send(list_coordinator_groups)
  })
}
exports.coordinator_group_detail = function (req, res) {
  CoordinatorGroup.find({
    _id: req.params.id
  }, function (err, coordinator_group) {
    if (err) {
      return next(err)
    }
		// Successful, so render
    res.send(coordinator_group)
  })
}
exports.coordinator_group_create = function (req, res, next) {
  var coordinatorGroup = new CoordinatorGroup({
    description: req.body.description,
    name: req.body.name,
    active: req.body.active,
    added: req.body.added,
    calculation: req.body.calculation,
    sensortype: ref.body.sensor_type,
    sensors: ref.body.sensors
  })
  res.redirect(303, coordinatorGroup.url)
}
exports.coordinator_group_delete = function (req, res) {
  CoordinatorGroup.findOneAndUpdate({
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
    return res.send('Coordinator Group Deleted')
  })
}
exports.coordinator_group_update = function (req, res) {
  CoordinatorGroup.findOneAndUpdate({
    _id: req.body.id
  }, {
    description: req.body.description,
    name: req.body.name,
    active: req.body.active,
    added: req.body.added,
    calculation: req.body.calculation,
    sensortype: ref.body.sensor_type,
    sensors: ref.body.sensors
  }, {
    upsert: false
  },
		function (err, doc) {
  if (err) {
    return res.send(500, {
      error: err
    })
  }
  if (doc != null) {
    res.redirect(303, doc.url)
  } else {
    res.send(500, 'coordinator group not found')
  }
})
}
