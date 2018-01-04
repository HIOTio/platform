var Platform = require("../models/platform");

exports.platformList = function (req, res, next) {
  Platform.find({}, function (err, list_platforms) {
    if (err) {
      return next(err);
    }
		// Successful, so render
    res.send(list_platforms);
  });
};

exports.platformDetail = function (req, res, next) {
  Platform.find({
    _id: req.Platforms.id
  }, function (err, Platform) {
    if (err) {
      return next(err);
    }
		// Successful, so render
    res.send(Platform);
  });
};
exports.platformCreate = function (req, res, next) {
  var platform = new Platform({
    description: req.body.description,
    added: req.body.added
  });
  res.redirect(303, platform.url);
};
exports.platformDelete = function (req, res, next) {
  Platform.findOneAndUpdate({
    _id: req.body.id
  }, {
    active: false
  }, {
    upsert: false
  }, function (err, doc) {
    if (err) {
      return res.send(500, {
        error: err
      });
    }
    return res.send("Platform Deleted");
  });
};
exports.platformUpdate = function (req, res, next) {
  Platform.findOneAndUpdate({
    _id: req.body.id
  }, {
    description: req.body.description,
    added: req.body.added
  }, {
    upsert: false
  },
		function (err, doc) {
  if (err) {
    return res.send(500, {
      error: err
    })
  }
  if (doc != null) {
    res.redirect(303, doc.url);
  } else {
    res.send(500, "Platform not found");
  }
});
};
