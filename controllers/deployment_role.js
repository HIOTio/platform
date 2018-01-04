var DeploymentRole = require("../models/deployment_role");

function deploymentsForUser (userId) {
  if(userId===0){
    return [];
  }else{
    DeploymentRole.find({
      profile: userId
    }).populate("deployment").exec(function (err, deploymentRole) {
      if (err) {
        return err;
      }
      return deploymentRole;
    });
}
};
exports.deploymentRoleList = function (req, res, next) {
  DeploymentRole.find({}, function (err, list_deploymentRoles) {
    if (err) {
      return next(err);
    }
		// Successful, so render
    res.send(list_deploymentRoles);
  });
};
exports.deploymentRoleDetailByDeployment = function (req, res, next) {
  DeploymentRole.find({
    deployment: req.params.deployment
  }).populate("role").populate("profile").exec(function (err, deploymentRole) {
    if (err) {
      return next(err);
    }
		// Successful, so render
    res.send(deploymentRole);
  });
};
exports.deploymentRoleDetail = function (req, res, next) {
  DeploymentRole.find({
    _id: req.params.id
  }, function (err, deploymentRole) {
    if (err) {
      return next(err);
    }
		// Successful, so render
    res.send(deploymentRole);
  });
};

exports.deploymentRoleCreate = function (req, res, next) {
  var deploymentRole = new DeploymentRole({
    deployment: req.body.deployment,
    profile: req.body.profile,
    role: req.body.role,
    active: req.body.active
  });
  deploymentRole.save(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(deploymentRole.url);
  });
};
exports.deploymentsForUser = function (userId) {
  //  console.log("in exports")
  if(userId===0){
    return [];
  }else{
    DeploymentRole.find({
      profile: userId
    }).populate("deployment").exec(function (err, deploymentRole) {
      if (err) {
        return err;
      }

  //    console.log(deploymentRole)
  //    console.log("finished in deploymentRole")
      return deploymentRole;
    });
  }
};

exports.deploymentRoleDetailByProfile = function (req, res, next) {
  if(req.params.profile===0){
    res.send([]);
  }else{
    DeploymentRole.find({
      profile: req.params.profile
    }).populate("role").populate("deployment").exec(function (err, deploymentRole) {
      if (err) {
        return next(err);
      }
      res.send(deploymentRole);
    });
  }
};

exports.deploymentRoleUpdate = function (req, res) {
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
  res.redirect(303, doc.url);
})
};
