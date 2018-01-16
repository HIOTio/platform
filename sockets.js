var app = {};
var socketSend = {};
var channels = {};
var cmd={};
exports.init = function(sApp) {
    this.app = sApp;
    require("express-ws")(this.app);
    this.app.use("/m2p", function(req, res, next) {
        if (req.body.msg) {
            socketSend.send(req.body.msg);
            res.send(200);
        } else {
            res.send(500);
        }
    });
    this.app.ws("/:channel", function(ws,req){
        ws.on("message",function(message){
            cmd=JSON.parse(message);
            if(cmd.action==="connect"){
                if(!channels[req.params.channel]){
                    channels[req.params.channel]=[];
                }
                channels[req.params.channel].push(ws);
            }
        });
        ws.on("close", function(){
        })
    })
}

exports.deregisterChannel=function(channel){
    delete channels[channel];
}
exports.send = function(channel, message) {
    if(channels[channel]){
        channels[channel].forEach((chan) => {
            chan.send(message,function ack(error) {
                // If error is not defined, the send has been completed, otherwise the error
                // object will indicate what failed.
            });
        });
    }
}
