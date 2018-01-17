var Comms = require("../models/comms");
var debug=require("debug")("controllers/comms.js");
var utils = require("../utils");
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
  utils.goSave(comms,res);

};