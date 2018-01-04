var Subscription = require("../models/subscription")

exports.subscriptionList = function (req, res, next) {
  Subscription.find({}, function (err, list_subscription) {
    if (err) {
      return next(err)
    }
		// Successful, so render
    res.send(list_subscription)
  })
}

exports.subscriptionDetail = function (req, res, next) {
  Subscription.find({
    _id: req.body.id
  }, function (err, Subscription) {
    if (err) {
      return next(err)
    }
		// Successful, so render
    res.send(Subscription)
  })
}
exports.subscriptioCreate = function (req, res, next) {
  var subscription = new Subscription({
    description: req.body.description,
    topic: req.body.topic,
    added: req.body.added
  })
  res.redirect(303, subscription.url)
}
exports.subscriptionDelete = function (req, res, next) {
  Subscription.findOneAndUpdate({
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
    return res.send("Subscription Deleted")
  })
}
exports.subscriptionUpdate = function (req, res, next) {
  Subscription.findOneAndUpdate({
    _id: req.body.id
  }, {
    description: req.body.description,
    topic: req.body.topic,
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
    res.redirect(303, doc.url)
  } else {
    res.send(500, "Subscription not found")
  }
})
}
