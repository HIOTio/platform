var Group = require("../models/groups");
var debug=require("debug")("controllers/groups.js");
var utils = require("../utils");
exports.groupList = function (req, res, next) {
  Group.find({}, function (err, listGroups) {
    if (err) {
      debug(err);
      return next(err);
    }
		// Successful, so render
    res.send(listGroups);
  });
};

exports.groupDetail = function (req, res, next) {
  Group.find({
    _id: req.params._id
  }, function (err, group) {
    if (err) {
      debug(err);
      return next(err);
    }
		// Successful, so render
    res.send(group);
  });
};
exports.groupCreate = function (req, res, next) {
  var group = new Group({
    description: req.body.description,
    added: req.body.added,
    active: req.body.active,
    isAdmin: req.body.isAdmin,
    isConfigAdmin: req.body.isConfigAdmin,
    isBilling: req.body.isBilling,
    isReader: req.body.isReader,
    isCgAdmin: req.body.isCgAdmin
  });
  utils.goSave(group,res);
};
exports.groupDelete = function (req, res, next) {
  Group.findOneAndUpdate({
    _id: req.body.id
  }, {
    active: false
  }, {
    upsert: false
  }, function (err, doc) {
    if (err) {
      debug(err);
      return res.send(500, {
        error: err
      });
    }
    return res.send("Group Deleted");
  });
};
exports.groupUpdate = function (req, res, next) {
  Group.findOneAndUpdate({
    _id: req.body._id
  }, {
    description: req.body.description,
    added: req.body.added,
    active: req.body.active,
    isAdmin: req.body.isAdmin,
    isConfigAdmin: req.body.isConfigAdmin,
    isBilling: req.body.isBilling,
    isEeader: req.body.isReader,
    isCgAdmin: req.body.isCgAdmin
  }, {
    upsert: false
  },
		function (err, doc) {
  if (err) {
    debug(err);
    return res.send(500, {
      error: err
    });
  }
  if (doc != null) {
    res.redirect(303, doc.url);
  } else {
    res.send(500, "Group not found");
  }
});
};
