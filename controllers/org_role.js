var OrgRole = require("../models/org_role");
var debug=require("debug")("controllers/org_role.js");

exports.orgRoleList = function (req, res, next) {
  OrgRole.find({},function(err,org){
    if (err) {
      debug(err);
      return next(err);
    }
    res.send(org);
  })
};

exports.newOrgRole = function (req, res, next) {
  var orgRole = new OrgRole({
    name: req.body.name,
    description: req.body.description,
    active: req.body.active,
    added: req.body.added
  })
  orgRole.save(function(err)
  {
    if (err) {
      debug(eer);
      return next(err);
      
    }
    res.send(orgRole);
  })
};
exports.updateOrgRole = function (req, res, next) {
 
};
exports.orgRoleDetail =  function(req, res, next){
  OrgRole.findOne({_id: req.params._id}, function(err,orgRole){
    if (err) {
      debug(err);
      return next(err);
    }
    res.send (orgRole);
  })
}
exports.orgRoleDelete = function (req, res, next) {
  
};
