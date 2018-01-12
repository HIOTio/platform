var Publication = require("../models/publication");
var debug=require("debug")("controllers/publication.js");

exports.publicationList = function (req, res, next) {
  Publication.find({}, function (err, list_publications) {
    if (err) {
      debug(err);
      return next(err)
    }
		// Successful, so render
    res.send(list_publications)
  })
}

exports.publicationDetail = function (req, res, next) {
  Publication.find({
    _id: req.Publications.id
  }, function (err, Publication) {
    if (err) {
      debug(err);
      return next(err)
    }
		// Successful, so render
    res.send(Publication)
  })
}
exports.publicationCreate = function (req, res, next) {
  var publication = new Publication({
    description: req.body.description,
    added: req.body.added,
    topic: req.body.topic
  })
  res.redirect(303, publication.url)
}
exports.publicationDelete = function (req, res, next) {
  Publication.findOneAndUpdate({
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
    return res.send("Publication Deleted")
  })
}
exports.publicationUpdate = function (req, res, next) {
  Publication.findOneAndUpdate({
    _id: req.body.id
  }, {
    description: req.body.description,
    added: req.body.added,
    topic: req.body.topic
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
    res.redirect(303, doc.url)
  } else {
    res.send(500, "Publication not found")
  }
})
}
