var DeploymentRole = require('../models/deployment_role')

function deployments_for_user (userId) {
  DeploymentRole.find({
    profile: userId
  }).populate('deployment').exec(function (err, deployment_role) {
    if (err) {
      return err
    }
    return deployment_role
  })
}
exports.deployment_role_list = function (req, res, next) {
  Deployment.find({}, function (err, list_deployment_roles) {
    if (err) {
      return next(err)
    }
		// Successful, so render
    res.send(list_deployment_roles)
  })
}
exports.deployment_role_detail_by_deployment = function (req, res, next) {
  DeploymentRole.find({
    deployment: req.params.deployment
  }).populate('role').populate('deployment').exec(function (err, deployment_role) {
    if (err) {
      return next(err)
    }
		// Successful, so render
    res.send(deployment_role)
  })
}
exports.deployment_role_detail = function (req, res, next) {
  DeploymentRole.find({
    _id: req.params.id
  }, function (err, deployment_role) {
    if (err) {
      return next(err)
    }
		// Successful, so render
    res.send(deployment_role)
  })
}

exports.deployment_role_create = function (req, res, next) {
  var deploymentRole = new DeploymentRole({
    deployment: req.body.deployment,
    profile: req.body.profile,
    role: req.body.role,
    active: req.body.active
  })
  deploymentRole.save(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect(deploymentRole.url)
  })
}
exports.deployments_for_user = function (userId) {
//  console.log('in exports')
  DeploymentRole.find({
    profile: userId
  }).populate('deployment').exec(function (err, deployment_role) {
    if (err) {
      return err
    }

//    console.log(deployment_role)
//    console.log('finished in deployment_role')
    return deployment_role
  })
}

exports.deployment_role_detail_by_profile = function (req, res, next) {
  DeploymentRole.find({
    profile: req.params.profile
  }).populate('role').populate('deployment').exec(function (err, deployment_role) {
    if (err) {
      return next(err)
    }
    res.send(deployment_role)
  })
}
exports.deployment_role_update = function (req, res) {
//  console.log(req.body)
  DeploymentRole.findOneAndUpdate({
    _id: req.body.id
  }, {
    deployment: req.body.deployment,
    profile: req.body.profile,
    role: req.body.role,
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
