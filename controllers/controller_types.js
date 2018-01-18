var ControllerType = require("../models/controller_type");
var debug= require("debug");
var utils = require("../utils");

exports.list = function(req, res, next) {
    ControllerType.find({},function(err,list){
        if (err) {
            debug(err);
            return next(err);
        }
        res.send(list);
    })
};

exports.create = function(req, res, next){

};

exports.update = function(req, res, next) {

};

exports.delete = function(req, res, next) {

};