var Organisation = require("../models/organisation");
var OrgRole = require("../models/org_role");
var debug=require("debug")("controllers/organisation.js");
var email = require("./email");
var Profile =require("../models/profile");
exports.organisationList = function (req, res, next) {
  Organisation.find({},function(err,org){
    if (err) {
      debug(err);
      return next(err);
    }
    res.send(org);
  });
};

exports.newOrganisation = function (req, res, next) {
  var orgRole = "";
  OrgRole.findOne({name: "administrator"}, function(err,oRole){
    if (err){
      res.send(err);
    }
    if (!oRole){
      res.send({"status":500, "error": "please set up an "administrator" role first"});
    }else{
      var organisation = new Organisation({
      name: req.body.name,
      description: req.body.description,
      active: req.body.active,
      added: req.body.added,
      members:[
        {
          member: req.body.creator,
          memberRole: oRole._id
        }
      ]
    })
    organisation.save(function(err)
    {
      if (err) {
        debug(err);
        return next(err);
        
      }
      res.send(organisation);
    })
    }
  });
    
  
  
};
exports.updateOrganisation = function (req, res, next) {
 Organisation.findOneAndUpdate(
   { _id: req.body._id,},
   {
      name: req.body.name,
      description: req.body.description,
      "members": req.body.members
    },
   { upsert: false },
   function( err,doc) {
      if (err) {
        res.send(err);
      }
      res.send(doc);
    });
};
exports.organisationDetail =  function(req, res, next){
  Organisation.findOne({_id: req.params._id}, function(err,org){
    if (err) {
      debug(err);
      return next(err);
    }
    res.send (org);
  });
};
exports.addMember = function (req, res, next) {
  Organisation.findOne(
    {
      _id: req.body._id,
      "members.member": req.body.member,
      "members.memberRole":req.body.role_id
    },function(err, doc){
      if (!doc){
        Organisation.update(
    {
      _id: req.body._id
    },
    {
      $push: {
        members:
          {
            member: req.body.member,
            memberRole: req.body.role_id
          }
      }
      
    },function (err, doc) {
    if (err) {
      debug(err);
      return res.send(500, {
        error: err
      })
    }
    return res.send(doc);
  });
      }else{
        res.send({"status":200,"message":"that user already has that role in the organisation"});
      }
    });
  

};
exports.inviteMembers = function (req, res, next) {
 Organisation.findOne(
    {
      _id: req.body._id,
      "members.member": req.body.member,
      "members.memberRole":req.body.role_id,
      $or: [ {invited: null}, {invited:false}]
    },function(err, doc){
      if (!doc){
        Organisation.update(
    {
      _id: req.body._id
    },
    {
      $push: {
        members:
          {
            member: req.body.member,
            memberRole: req.body.role_id,
            invited: true
          }
      }
      
    },function (err, doc) {
    if (err) {
      debug(err);
      return res.send(500, {
        error: err
      })
    }
        Profile.findOne({_id:req.body.member},function(err,prof){
          if (err){
            res.send(500);
            debug(err);
          }
          email.send({
          subject:"Join My Org",
          message:"join my org",
          recipient: prof.email
        });
        });
        
    return res.send(doc);
        
  });
      }else{

        res.sendStatus(200);
      }
    });
  

};
exports.organisationDelete = function (req, res, next) {
  
};