var device= require("./device");

function _getDeviceConfig(req,res,next){
    //build the structure of the config

    res.send({
        function:"_getDeviceConfig",
        status: "not implemented"
    });
}

function _testDeviceConfig(req,res,next){
    res.send({
        function:"_testDeviceConfig",
        status: "not implemented"
    });
}

function _resetDeviceConfig(req,res,next){
    res.send({
        function:"_resetDeviceConfig",
        status: "not implemented"
    });
}

function UpdateDeviceConfig(req,res,next){
    res.send({
        function:"UpdateDeviceConfig",
        status: "not implemented"
    });
}
module.exports = {
    getDeviceConfig: _getDeviceConfig,
    testDeviceConfig: _testDeviceConfig,
    resetDeviceConfig: _resetDeviceConfig,
    updateDeviceConfig: UpdateDeviceConfig
}
