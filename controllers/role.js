var Role = require("../models/role");
var debug=require("debug")("controllers/role.js");
exports.roleList = function (req, res, next) {
  Role.find({}, function (err, listRoles, next) {
    if (err) {
      debug(err);
      return next(err);
    }
        // Successful, so render
    res.send(listRoles);
  });
};

exports.roleDetail = function (req, res, next) {
  Role.findById(req.params._id, function (err, role) {
    if (err) {
      debug(err);
      return next(err);
    }
        // Successful, so render
    res.send(role);
  });
};
exports.roleCreate = function (req, res, next) {
  var role = new Role({
    description: req.body.description,
    name: req.body.name,
    addSeployment: req.body.addDeployment,
    addUser: req.body.addUser,
    controlDevices: req.body.controlDevices
  });
  role.save(function (err) {
    if (err) {
      debug(err);
      return next(err);
    }
    res.redirect(role.url);
  });
};
exports.roleDelete = function (req, res, next) {
  Role.findOneAndUpdate({
    _id: req.body.id
  }, {
    active: false
  }, {
    upsert: false
  }, function (err, doc) {
    if (err) {
      debug(err);
      next(err);
    }
    return res.send("Role Deleted");
  });
};
exports.roleUpdate = function (req, res, next) {
  Role.findOneAndUpdate({
    _id: req.body.id
  }, {
    description: req.body.description,
    name: req.body.name,
    addDeployment: req.body.addDeployment,
    addUser: req.body.addUser,
    controlDevices: req.body.controlDevices
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
          res.redirect(303, doc.url);
        });
};
