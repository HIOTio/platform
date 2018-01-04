var Location = require("../models/location");

exports.locationList = function (req, res, next) {
  Location.find({}, function (err, listLocations) {
    if (err) {
      return next(err);
    }
		// Successful, so render
    res.send(listLocations);
  })
};
exports.locationListByDeployment = function (req, res, next) {
 // console.log(req.params.deployment)
  Location.find({
    deployment:req.params.deployment
  }, function (err, listLocations) {
    if (err) {
      return next(err);
    }
		// Successful, so render
    res.send(listLocations);
  });
};
exports.locationDetail = function (req, res, next) {
  Location.find({
    _id: req.params.id
  })
  .populate("parent")
  .exec( function (err, location) {
    if (err) {
      return next(err);
    }
		// Successful, so render
    res.send(location);
  });
};
exports.locationCreate = function (req, res, next) {
  var location = new Location({
    description: req.body.description,
    deployment:req.body.deployment,
    parent: req.body.parent,
    added: req.body.added
  })
  location.save(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(location.url);
  });
};
exports.locationDelete = function (req, res, next) {
  Location.findOneAndUpdate({
    _id: req.body.id
  }, {
    active: false
  }, {
    upsert: false
  }, function (err, doc) {
    if (err) {
      return res.send(500, {
        error: err
      })
    }
    return res.send("Location Deleted");
  });
};
exports.locationUpdate = function (req, res, next) {
  Location.findOneAndUpdate({
    _id: req.body.id
  }, {
    description: req.body.description,
    parent: req.body.parent,
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
    res.send(500, "Location not found");
  }
});
};
