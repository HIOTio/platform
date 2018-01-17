var Param = require("../models/param");
var debug=require("debug")("controllers/param.js");

exports.paramList = function (req, res, next) {
  Param.find({}, function (err, listParams) {
    if (err) {
      debug(err);
      return next(err);
    }
		// Successful, so render
    res.send(listParams);
  });
};

exports.paramDetail = function (req, res, next) {
  Param.find({
    _id: req.params._id
  }, function (err, Param) {
    if (err) {
      debug(err);
      return next(err);
    }
		// Successful, so render
    res.send(Param);
  });
};
exports.paramCreate = function (req, res, next) {
  var param = new Param({
    name: req.body.name,
    value: req.body.value,
    description: req.body.description,
    required: req.body.required,
    min: req.body.min,
    max: req.body.max,
    default: req.body.default
  });
  param.save(function(err,doc){
    if(!err){
        res.send(doc);
    }
  });
};
exports.paramDelete = function (req, res, next) {
  Param.findOneAndUpdate({
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
    return res.send("Param Deleted");
  });
};
exports.paramUpdate = function (req, res, next) {
  Param.findOneAndUpdate({
    _id: req.body.id
  }, {
    name: req.body.name,
    value: req.body.value,
    description: req.body.description,
    required: req.body.required,
    min: req.body.min,
    max: req.body.max,
    default: req.body.default
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
    res.send(doc);
  } else {
    res.send(500, "Param not found");
  }
});
};
