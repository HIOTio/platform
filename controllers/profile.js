var Profile = require("../models/profile");
var debug=require('debug')('controllers/profile.js');
var config = require("../config");
var jwt = require("jsonwebtoken");
exports.profileAuth = function (req, res, next) {
  Profile.findOne({
    username: req.body.username
  }, function (err, profile) {
 //     console.log(profile)
    if (err) {
      debug(err);
  //    console.log(err)
      return next(err);
    }
    if (profile == null) {
      res.setHeader("WWW-Authenticate", "Basic realm=\"need login\"");
      res.status(401).send({
        success:false,
        error: "Please try again",
        token: null,
        profile:null
      });
    } else {
      profile.comparePassword(req.body.password, function (err, isMatch) {
        if (err) { 
          debug(err);
          return next(err);
        }
        if (isMatch) {
          var payload = {
            id: profile._id
          }
          var token = jwt.sign(payload, config.secret);

          res.send({
            success: true,
            message: "Authenticated",
            token,
            profile
          });
        } else {
     //       console.log("auth failed")
          res.setHeader("WWW-Authenticate", "Basic realm=\"need login\"");
          res.status(401).send({
            success:false,
            error: "Please try again",
            token: null,
            profile:null
          });
        }
      });
    }
  });
}
exports.profileDetail = function (req, res, next) {
  Profile.findOne({
    _id: req.params.profile
  }, function (err, profile) {
    if (err) {
      debug(err);
      return next(err);
    }
    res.send(profile);
  });
}

exports.findById = function (id, callback) {
  Profile.findOne({
    _id: id
  }, function (err, profile) {
    if (!err) {
		// Successful, so render
    callback.call(profile);
    }
  })
}
exports.profileCreate = function (req, res, next) {
  req.checkBody("username", "Each profile needs a username").notEmpty();
  req.sanitize("username").escape();
  req.sanitize("username").trim();
  req.checkBody("password", "Each profile needs a pasword").notEmpty();
  req.sanitize("password").escape();
  req.sanitize("password").trim();
  req.checkBody("firstname", "Each profile needs a first name").notEmpty();
  req.sanitize("firstname").escape();
  req.sanitize("firstname").trim();
  req.checkBody("lastname", "Each profile needs a last name").notEmpty();
  req.sanitize("lastname").escape();
  req.sanitize("lastname").trim();
  var errors = req.validationErrors();
  
  var profile = new Profile({
    username: req.body.username,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
      email:req.body.email
  });
 // console.log("starting to save")
  profile.save(function (err, doc) {
    if (err) {
      debug(err);
      return next(err);
    }
    res.status(200).json({
        
      "msg": "Congrats, your profile has been created",
      "redirect": doc.url
    });
  });
}

exports.profileDelete = function (req, res) {
  Profile.findOneAndUpdate({
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
    return res.send("Profile Deleted");
  });
}
exports.profileUpdate = function (req, res) {
  Profile.findOneAndUpdate({
    _id: req.body.id
  }, {
    "username": req.body.username,
    "firstname": req.body.firstname,
    "lastname": req.body.lastname
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
}
