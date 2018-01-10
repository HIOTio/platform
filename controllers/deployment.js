var Deployment = require("../models/deployment");
var DeploymentRole = require("../models/deployment_role");
var Device = require("../models/device");
var Role = require("../models/role");
var Location = require('../models/location');
var sockets = require("../sockets");

exports.deploymentList = function(req, res, next) {
    Deployment.find({}, function(err, listDeployments) {
        //   console.log(req)
        if (err) {
            return next(err);
        }
        res.send(listDeployments);
    });
};
exports.deploymentDetail = function(req, res, next) {
    Deployment.findOne({
        _id: req.params.id
    }).populate("deploymentType").exec(function(err, deployment) {
        if (err) {
            return next(err);
        }

        res.send(deployment);

        
    });
};
exports.deploymentSummary = function(req,res,next){
    Deployment.findOne({
        _id: req.params.id
    }).populate("deploymentType")
    .populate("owner")
    .exec(function(err, deployment) {
        if (err) {
            return next(err);
        }
        DeploymentRole.count({deployment:deployment._id}).exec(function(err,userCount){
            Device.count({deployment:deployment._id}).exec(function(err,deviceCount){
                Location.count({deployment:deployment._id}).exec(function(err,locationCount){
                    res.send({dep:deployment,users:userCount, devices:deviceCount, locations:locationCount});
                });
            });
        });
    });
}
exports.deploymentChangeOwner=function(req,res,next){
    Deployment.findOneAndUpdate({
        _id:req.params.id
    }, {
            owner: req.params.owner
        }, {
            upsert: false
        }, function(err, doc) {
            if (err) {
                return res.send(500, {
                    error: err
                });
            }
            return res.send(doc);
        })
        // need to remove all the associated deployment roles and then broadcast on relevant channels
    sockets.send("deployment-" + req.body.id, JSON.stringify({ "deployment":req.body.id,"action":"owner changes","message": "Deployment \"" + req.body.id+ "\" has a new owner" }));

}
exports.deploymentCreate = function(req, res, next) {
    //NOTE: think about giving the user the option of changing the owner of a new deployment - for now, just hard-code  it [Issue #4]
    //  console.log(JSON.stringify(req.body))
    var deployment = new Deployment({
        description: req.body.description,
        name: req.body.name,
        deploymentType: req.body.deploymentType,
        owner: req.body.owner
    });
    deployment.save(function(err) {
        if (err) {
            return next(err);
        }
        //TODO: [x]get the _id for role type "owner" [Issue #1]
        Role.findOne({
            name: "Owner"
        }, function(err, resp) {
            if (err) {
                //TODO: need to handle this properly [Issue #6]
            }
            //TODO: [x]add the owner to the deploymentRoles [Issue #5]
            var deploymentRole = new DeploymentRole({
                deployment: deployment._id,
                profile: deployment.owner,
                role: resp._id
            });
            deploymentRole.save(function(err) {
                if (err) {
                    //TODO: have to handle this error as well [Issue #3]
                }
                res.redirect(deployment.url);
            });
        })

    });
};
exports.deploymentDelete = function(req, res, next) {
    Deployment.findOneAndUpdate({
            _id: req.body.id
        }, {
            active: false
        }, {
            upsert: false
        }, function(err, doc) {
            if (err) {
                return res.send(500, {
                    error: err
                });
            }
            return res.send("Deployment Deleted");
        })
        // need to remove all the associated deployment roles and then broadcast on relevant channels
    sockets.send("deployment-" + req.body.id, JSON.stringify({ "deployment":req.body.id,"action":"deleted","message": "Deployment \"" + req.body.name+ "\" has been deleted" }));
};
exports.deploymentUpdate = function(req, res) {
    //  console.log(req.body)
    Deployment.findOneAndUpdate({
            _id: req.body._id
        }, {
            description: req.body.description,
            name: req.body.name,
            owner: req.body.owner,
            added: req.body.added,
            active: req.body.active,
            deploymentType: req.body.deploymentType
        }, {
            upsert: false
        },
        function(err, doc) {
            if (err) {
                return res.send(500, {
                    error: err
                })
            }
            sockets.send("deployment_" + req.body._id, JSON.stringify({ "deployment":req.body._id,"action":"updated","message": "Deployment \"" + req.body.name+ "\" has been updated" }));
            res.send(doc);
            
        })
};
