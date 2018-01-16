var Health = require("../models/health");
var debug=require("debug")("controllers/health.js");

exports.healthList = function (req, res, next) {
  Health.find({}, function (err, listHealths) {
    if (err) {
      debug(err);
      return next(err);
    }
		// Successful, so render
    res.send(listHealths);
  });
};

exports.healthDetail = function (req, res, next) {
  Health.find({
    _id: req.params.id
  }, function (err, health) {
    if (err) {
      debug(err);
      return next(err);
    }
		// Successful, so render
    res.send(health);
  });
};
exports.healthCreate = function (req, res, next) {
  var health = new Health({
    description: req.body.description,
    added: req.body.added,
    active: req.body.active,
    isAdmin: req.body.isAdmin,
    isConfigAdmin: req.body.isConfigAdmin,
    isBilling: req.body.isBilling,
    isReader: req.body.isReader,
    isCgAdmin: req.body.isCgAdmin
  });
  res.redirect(303, health.url);
};
exports.healthDelete = function (req, res, next) {
  Health.findOneAndUpdate({
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
    return res.send("Health Deleted");
  });
};
exports.healthUpdate = function (req, res, next) {
  Health.findOneAndUpdate({
    _id: req.body.id
  }, {
    description: req.body.description,
    added: req.body.added,
    active: req.body.active,
    isAdmin: req.body.isAdmin,
    isConfigAdmin: req.body.isConfigAdmin,
    isBilling: req.body.isBilling,
    isReader: req.body.isReader,
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
    res.send(500, "Health not found");
  }
});
};
