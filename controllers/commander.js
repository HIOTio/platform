var Commander = require("../models/commander");
var debug=require("debug")("controllers/commander.js");
var utils = require("../utils");

exports.commanderList = function (req, res, next) {
  Commander.find({}, function (err, listCommanders) {
    if (err) {
      debug(err);
      return next(err);
    }
    // Successful, so render
    res.send(listCommanders);
  });
};

exports.commanderDetail = function (req, res, next) {
  Commander.find({
    _id: req.params._id,
  }, function (err, commander) {
    if (err) {
      debug(err);
      return next(err);
    }
    // Successful, so render
    res.send(commander);
  });
};
exports.commanderCreate = function (req, res, next) {
    var commander = new Commander({
        description: req.body.description,
        name: req.body.name,
        deployment:req.body.deployment,
        controllers:req.body.controllers,
        paths:req.body.path,
        active: req.body.active,
        added: req.body.added
  });
 utils.goSave(commander,res);
};
exports.commanderDelete = function (req, res, next) {
  utils.markDeleted(Commander, req, res);
  
};
exports.commanderUpdate = function (req, res, next) {
  Commander.findOneAndUpdate({
    _id: req.body._id,
  }, {
        description: req.body.description,
        name: req.body.name,
        deployment:req.body.deployment,
        controllers:req.body.controllers,
        paths:req.body.path,
        active: req.body.active,
        added: req.body.added
  }, {
    upsert: false,
  },
  function (err, doc) {
    if (err) {
      debug(err);
      return res.send(500, {
        error: err,
      });
    }
    res.redirect(303, doc.url);
  });
};
