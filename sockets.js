var app = {};
var socketSend = {};
var channels = {};
exports.init = function(_app) {
    this.app = _app
    require('express-ws')(this.app);
    this.app.use('/m2p', function(req, res, next) {
        if (req.body.msg) {
            console.log(socketSend)
            socketSend.send(req.body.msg);
            res.send(200)
        } else {
            console.log(req)
            res.send(500);
        }
    })

}

exports.deregisterChannel=function(channel){
    delete channels[channel];
}
exports.send = function(channel, message) {
        this.app.ws('/' + channel, function(ws, req) {
            console.log(channel);
            ws.send(message);
            console.log(message);
            channels[channel] = ws;
            ws.on('connect', function() {
                ws.send(message);
                console.log("sending message");
            });
            ws.on('error', function(err){
                console.log(err);
            });
        });
    
}


// enable comms from m2m - for now, just create a websocket message to send to connected clients