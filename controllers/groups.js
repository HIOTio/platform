var Group = require("../models/groups");
var debug=require("debug")("controllers/groups.js");

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
    _id: req.params.id
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
    is_admin: req.body.is_admin,
    is_config_admin: req.body.is_config_admin,
    is_billing: req.body.is_billing,
    is_reader: req.body.is_reader,
    is_cg_admin: req.body.is_cg_admin
  });
  res.redirect(303, group.url);
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
    _id: req.body.id
  }, {
    description: req.body.description,
    added: req.body.added,
    active: req.body.active,
    is_admin: req.body.is_admin,
    is_config_admin: req.body.is_config_admin,
    is_billing: req.body.is_billing,
    is_reader: req.body.is_reader,
    is_cg_admin: req.body.is_cg_admin
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
