var device= require("./device");

exports.getDeviceConfig = function (req,res,next){
    //build the structure of the config

    res.send({
        function:"getDeviceConfig",
        status: "not implemented"
    });
}

exports.testDeviceConfig = function (req,res,next){
    res.send({
        function:"testDeviceConfig",
        status: "not implemented"
    });
}

exports.resetDeviceConfig = function (req,res,next){
    res.send({
        function:"resetDeviceConfig",
        status: "not implemented"
    });
}

exports.updateDeviceConfig = function (req,res,next){
    res.send({
        function:"UpdateDeviceConfig",
        status: "not implemented"
    });
}
 