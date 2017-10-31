var DeploymentType = require('../models/deployment_type')

exports.deploymentTypeList = function (req, res, next) {
  DeploymentType.find({}, function (err, listDeploymentTypes) {
    if (err) {
      return next(err)
    }
    res.send(listDeploymentTypes)
  })
}
exports.deploymentTypeDetail = function (req, res, next) {
  DeploymentType.find({
    _id: req.params.id
  }, function (err, deploymentType) {
    if (err) {
      return next(err)
    }
    res.send(deploymentType)
  })
}
exports.deploymentTypeCreate = function (req, res, next) {
  var deploymentType = new DeploymentType({
    description: req.body.description,
    name: req.body.name,
    useLocation: req.body.useLocation,
    locationLabel: req.body.locationString,
    objectString: req.body.objectString,
    owner: req.body.owner
  })
  deploymentType.save(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect(deploymentType.url)
  })
}
exports.deploymentTypeDelete = function (req, res, next) {
  DeploymentType.findOneAndUpdate({
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
    return res.send('Deployment Type Deleted')
  })
}
exports.deploymentTypeUpdate = function (req, res) {
  DeploymentType.findOneAndUpdate({
    _id: req.body.id
  }, {
    description: req.body.description,
    name: req.body.name,
    owner: req.body.owner,
    added: req.body.added,
    active: req.body.active,
    useLocation: req.body.useLocation,
    locationLabel: req.body.locationString,
    objectString: req.body.objectString
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
