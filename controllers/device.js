var Device = require("../models/device");
exports.config= function(req,res,next){
  Device.findById(
    {_id:req.params.device}
  )
  .populate("brokers")
  .populate("aggregators")
  .populate("sensors")
  .populate("controllers")
  .exec(function(err,_device){
    if (err) {
      return next(err);
    }
    //create config.json format from device
    var devFile={
      device:{
        hiotId:_device.deviceId,
        name:_device.name,
        description:_device.description,
        devicePath:_device.devicePath
      },
      roleChannels:{
        broker:_device.brokers,
        coordinator: _device.coordinator,
        controller: _device.controllers,
        aggregator:_device.aggregators,
        sensor: _device.sensors,
      },
      moscaEnabled: _device.moscaEnabled,
      moscaPort: _device.moscaPort,
      mqttServers: _device.mqttBrokers
    };
    res.send(devFile);
  });
};
exports.deviceList = function (req, res, next) {
  Device.find({}, function (err, listDevices) {
    if (err) {
      return next(err);
    }
		// Successful, so render
    res.send(listDevices);
  });
};
exports.deviceCount = function (req, res, next) {
  Device.count({
    deployment: req.params.deployment
  }, function (err, devCount) {
    res.send({
      "device_count": devCount
    });
  });
};
exports.deviceListForDeployment = function (req, res, next) {
      //use query params to filter
      var query={};
      if(req.params.deployment){
        query.deployment=req.params.deployment;
      }
      if(req.params.location){
        //TODO: need to include any child locations, including nested ones [Issue #9]
        query.location=req.params.location;
      }
      if(req.query.handler){
        //TODO: need to include make/model/ [Issue #2]
        query.handler=req.params.handler;
      }
  Device.find(query)
  .populate("make")
  .populate("model")
  .exec( function (err, listDevices) {
    if (err) {
      
      return next(err);
    }
    res.send(listDevices);
  });
};
exports.deviceDetail = function (req, res, next) {
  Device.find({
    _id: req.params.id
  }, function (err, device) {
    if (err) {
      return next(err);
    }
		// Successful, so render
    res.send(device);
  });
};
exports.deviceCreate = function (req, res, next) {
  var device = new Device({
    deviceId: req.body.deviceId,
    deployment: req.body.deployment,
    name: req.body.name,
    description: req.body.description,
    location:req.body.location,
    make: req.body.make,
    model: req.body.model,
    devicePath:req.body.devicePath,
    mqttBrokers:req.body.mqttBrokers,
    added: req.body.added,
    active: req.body.active,
    coordinator:req.body.coordinator,
    aggregators: req.body.aggregators,
    controllers: req.body.controllers,
    sensors: req.body.sensors,
    brokers: req.body.brokers,
    moscaEnabled: req.body.moscaEnabled,
    moscaPort: req.body.moscaPort
  });
  device.save(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(device.url);
  });
};
exports.deviceDelete = function (req, res, next) {
  Device.findOneAndUpdate({
    _id: req.body.id
  }, {
    active: false
  }, {
    upsert: false
  }, function (err, doc) {
    if (err) {
      next(err);
    }
    return res.send("Device Deleted");
  });
};
exports.deviceUpdate = function (req, res, next) {
  Device.findOneAndUpdate({
    _id: req.body._id
  }, {
    deviceId: req.body.deviceId,
    deployment: req.body.deployment,
    name: req.body.name,
    description: req.body.description,
    location:req.body.location,
    make: req.body.make,
    model: req.body.model,
    mqttBrokers:req.body.mqttBrokers,
    added: req.body.added,
    devicePath:req.body.devicePath,
    active: req.body.active,
    coordinator:req.body.coordinator,
    aggregators: req.body.aggregators,
    controllers: req.body.controllers,
    sensors: req.body.sensors,
    brokers: req.body.brokers,
    moscaEnabled: req.body.moscaEnabled,
    moscaPort: req.body.moscaPort
  }, {
    upsert: false
  },
		function (err, doc) {
  if (err) {
    return res.send(500, {
      error: err
    });
  }
  res.redirect(303, doc.url);
});
};
