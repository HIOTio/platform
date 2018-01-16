var Organisation = require("../models/organisation");
var debug=require("debug")("controllers/organisation.js");

exports.organisationList = function (req, res, next) {
  Organisation.find({},function(err,org){
    if (err) {
      debug(err);
      return next(err);
    }
    res.send(org);
  })
};

exports.newOrganisation = function (req, res, next) {
  var organisation = new Organisation({
    name: req.body.name,
    description: req.body.description,
    active: req.body.active,
    added: req.body.added
  })
  organisation.save(function(err)
  {
    if (err) {
      debug(eer);
      return next(err);
      
    }
    res.send(organisation);
  })
};
exports.updateOrganisation = function (req, res, next) {
 
};
exports.organisationDetail =  function(req, res, next){
  Organisation.findOne({_id: req.params._id}, function(err,org){
    if (err) {
      debug(err);
      return next(err);
    }
    res.send (org);
  })
}
exports.addMember = function (req, res, next) {

};
exports.inviteMembers = function (req, res, next) {
 
};
exports.organisationDelete = function (req, res, next) {
  
}