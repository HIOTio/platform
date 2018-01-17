var DeploymentRole = require("../models/deployment_role");
var debug=require("debug")("controllers/deployment_role.js");
var utils = require("../utils");
function deploymentsForUser (userId) {
  if(userId===0){
    return [];
  }else{
    DeploymentRole.find({
      profile: userId
    }).populate("deployment").exec(function (err, deploymentRole) {
      if (err) {
        debug(err);
        return err;
      }
      return deploymentRole;
    });
}
}
exports.deploymentRoleList = function (req, res, next) {
  DeploymentRole.find({}, function (err, listDeploymentRoles) {
    if (err) {
      debug(err);
      return next(err);
    }
		// Successful, so render
    res.send(listDeploymentRoles);
  });
};
exports.deploymentRoleDetailByDeployment = function (req, res, next) {
  DeploymentRole.find({
    deployment: req.params.deployment
  })
  .populate("profile").exec(function (err, deploymentRole) {
    if (err) {
      debug(err);
      return next(err);
    }
		// Successful, so render
    res.send(deploymentRole);
  });
};
exports.deploymentRoleDetail = function (req, res, next) {
  DeploymentRole.find({
    _id: req.params._id
  }, function (err, deploymentRole) {
    if (err) {
      debug(err);
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
  utils.goSave(deploymentRole, res);
};
exports.deploymentsForUser = function (userId) {
  if(userId===0){
    return [];
  }else{
    DeploymentRole.find({
      profile: userId
    }).populate("deployment").exec(function (err, deploymentRole) {
      if (err) {
        debug(err);
        return err;
      }
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
        debug(err);
        return next(err);
      }
      res.send(deploymentRole);
    });
  }
};

exports.deploymentRoleUpdate = function (req, res) {
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
    debug(err);
    res.send(500, {
      error: err
    })
  }
  res.redirect(303, doc.url);
})
};

exports.deploymentRoleRemove=function (req,res,next){
  DeploymentRole.remove({deployment:req.body.deployment, profile: req.body.profile})
  .exec(function(err,resp){
    if(err){
      res.send(500, {
      error: err
    });
    }
    res.sendStatus(200);
  });
}