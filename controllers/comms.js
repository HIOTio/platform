var Comms = require("../models/comms");

exports.commsList=function(){

};

exports.newComms=function(req,res,next){
     var comms = new Comms({
    email: req.body.contact.email,
    name: req.body.contact.name,
    comment: req.body.contact.comment,
    responded: false,
    added: new Date()
  });
  comms.save(function (err) {
    if (err) {
      return next(err);
    }
    res.sendStatus(200);
  });

};