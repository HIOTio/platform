var Location = require("../models/location");
var debug=require("debug")("controllers/location.js");

exports.locationList = function (req, res, next) {
  Location.find({}, function (err, listLocations) {
    if (err) {
      debug(err);
      return next(err);
    }
		// Successful, so render
    res.send(listLocations);
  });
};
exports.locationListByDeployment = function (req, res, next) {
  Location.find({
    deployment:req.params.deployment
  })
  .populate("parent")
  .exec( function (err, listLocations) {
    if (err) {
      debug(err);
      return next(err);
    }
		// Successful, so render
    res.send(listLocations);
  });
};
exports.deploymentHierarchy = function (req, res, next) {
  Location.find({
    deployment:req.params.deployment
  })
  .exec( function (err, listLocations) {
    if (err) {
      debug(err);
      return next(err);
    }
    var paths={};
    listLocations.forEach(function(loc){
      parent=loc.parent;
      if(!loc.parent){
        parent="top";
      }
      if(!paths[parent]){
        paths[parent]= [];
      }
      paths[parent].push(loc);
    });
    
      res.send(paths);
  });
  
};
exports.locationDetail = function (req, res, next) {
  Location.find({
    _id: req.params._id
  })
  .populate("parent")
  .exec( function (err, location) {
    if (err) {
      debug(err);
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
      debug(err);
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
      debug(err);
      return res.send(500, {
        error: err
      })
    }
    return res.send("Location Deleted");
  });
};
exports.locationUpdate = function (req, res, next) {
  Location.findOneAndUpdate({
    _id: req.body._id
  }, {
    description: req.body.description,
    parent: req.body.parent,
    added: req.body.added
  }, {
    upsert: false
  },
		function (err, doc) {
  if (err) {
    debug(err);
    return res.send(500, {
      error: err
    })
  }
  if (doc != null) {
    res.send(doc);
  } else {
    res.send(500, "Location not found");
  }
});
};
