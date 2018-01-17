var debug=require("debug")("utils.js");
exports.goSave = function(obj, res) {
    obj.save(function (err) {
    if (err) {
      debug(err);
      return next(err);
    }
    res.send(obj);
  });
}
exports.markDeleted=function(obj, req,res){
    obj.findOneAndUpdate({
    _id: req.body._id
  }, {
    active: false,
  }, {
    upsert: false,
  }, function (err, doc) {
    if (err) {
      debug(err);
      next(err);
    }
    return res.send(200);
  });
}
exports.details=function (obj, req, res) {
    obj.find({
    _id: req.params._id,
  }, function (err, details) {
    if (err) {
      debug(err);
      return next(err);
    }
    // Successful, so render
    res.send(details);
  });
}
