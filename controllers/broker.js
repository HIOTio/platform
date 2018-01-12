"use strict";
var Broker = require("../models/broker");
var debug=require('debug')('controllers/broker.js');

exports.brokerList = function(req, res, next) {
    Broker.find({}, function(err, list_brokers) {
        if (err) {debug(err);
            return next(err);
        }
        // Successful, so render
        res.send(list_brokers);
    });
};
exports.brokerListForDeployment = function(req, res, next) {
    Broker.find({
        deployment: req.params.deployment
    }, function(err, list_broker) {
        if (err) {debug(err);
            return next(err);
        }
        // Successful, so render
        res.send(list_broker);
    });
};
exports.brokerDetail = function(req, res, next) {
    Broker.find({
        _id: req.params._id
    }).populate("myPaths").exec(function(err, broker) {
        if (err) {
            debug(err);
            return next(err);
        }
        // Successful, so render
        res.send(broker);
    });
};
exports.brokerCreate = function(req, res, next) {
    var broker = new Broker({
        deployment: req.body.deployment,
        description: req.body.description,
        name: req.body.name,
        myPaths: req.body.myPaths,
        handler: req.body.handler,
        active: req.body.active
    });
    broker.save(function(err) {
        if (err) {
            debug(err);
            return next(err);
        }
        res.redirect(broker.url);
    });
};
exports.brokerDelete = function(req, res, next) {
    Broker.findOneAndUpdate({
        _id: req.body.id
    }, {
        active: false
    }, {
        upsert: false
    }, function(err, doc) {
        if (err) {
            debug(err);
            next(err);
        }
        return res.send("Broker Deleted");
    });
};
exports.brokerUpdate = function(req, res, next) {
    Broker.findOneAndUpdate({
            _id: req.body._id
        }, {
            deployment: req.body.deployment,
            description: req.body.description,
            name: req.body.name,
            myPaths: req.body.myPaths,
            handler: req.body.handler,
            active: req.body.active
        }, {
            upsert: false
        },
        function(err, doc) {
            if (err) {
                debug(err);
                return res.send(500, {
                    error: err
                });
            }
            res.redirect(303, doc.url)
        })
}