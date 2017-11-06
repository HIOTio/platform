var app = {}
var socketSend = {}
var channels = {};
exports.init = function(_app) {
    app = _app
    require('express-ws')(app);
    app.use('/m2p', function(req, res, next) {
        if (req.body.msg) {
            console.log(socketSend)
            socketSend.send(req.body.msg);
            res.send(200)
        } else {
            console.log(req)
            res.send(500);
        }
    })
    app.ws('/:socket', function(ws, req) {
        socketSend = ws;
        ws.on('connect', function() {
            console.log("Ws Connection established");
        })
        ws.on('message', function(message) {
            channels[req.params.socket] = ws;
            console.log(channels)

            ws.send("You are connected to channel: " + req.params.socket);
        })
        ws.on('close', function() {
            console.log("Ws Connection closed");
        })

    });
}
exports.registerChannel = function(channel) {
    app.ws('/' + channel, function(ws, req) {
        console.log("registering ws channel " + channel);
        channels[channel] = ws;

        ws.on('connect', function() {
            console.log("Ws Connection established");
        })
        ws.on('open', function() {
            console.log("Ws Connection established");
        })
        ws.on('message', function(message) {
            console.log("received message " + message)
                // shouldn't need to do this, but anyway

            console.log("channels" + channels);

            ws.send("You are connected to channel: " + req.params.socket);
        })
        ws.on('close', function() {
            console.log("Ws Connection closed");
        })

    });
}
exports.send = function(channel, message) {
    if (channels[channel]) {
        channels[channel].send(message);
    } else {
        console.log(channels);
    }
}


// enable comms from m2m - for now, just create a websocket message to send to connected clients