var Publication = require('../models/publication')

exports.publication_list = function (req, res, next) {
  Publication.find({}, function (err, list_publications) {
    if (err) {
      return next(err)
    }
		// Successful, so render
    res.send(list_publications)
  })
}

exports.publication_detail = function (req, res, next) {
  Publication.find({
    _id: req.Publications.id
  }, function (err, Publication) {
    if (err) {
      return next(err)
    }
		// Successful, so render
    res.send(Publication)
  })
}
exports.publication_create = function (req, res, next) {
  var publication = new Publication({
    description: req.body.description,
    added: req.body.added,
    topic: req.body.topic
  })
  res.redirect(303, publication.url)
}
exports.publication_delete = function (req, res, next) {
  Publication.findOneAndUpdate({
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
    return res.send('Publication Deleted')
  })
}
exports.publication_update = function (req, res, next) {
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
    return res.send(500, {
      error: err
    })
  }
  if (doc != null) {
    res.redirect(303, doc.url)
  } else {
    res.send(500, 'Publication not found')
  }
})
}
