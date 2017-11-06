var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var channels = [];
var clientUpdates = {
    start: function() {
        server.listen(8000);
        io.set("origins", "*:*");

        io.on('connection', function(socket) {
            socket.on('newMessage', function(data) {
                socket.emit('clientUpdate', data);
                socket.broadcast.emit('clientUpdate', data);
            });
            socket.on('newUser', function(data) {
                socket.emit('clientUpdate', { 'userName': '', 'text': data + ' has entered the room' });
                socket.broadcast.emit('clientUpdate', { 'userName': '', 'text': data + ' has entered the room' });
            });
        });
    },
    broadcastOnChannel: function(channel, detail) {
        //limit to registered channels
        if (channels.findIndex(channel) > -1) {
            socket.emit(channel, detail);
        }
    },
    registerChannel: function(channel) {
        //TODO: work out the security here
        channels.push(channel);
    }
}

module.exports = clientUpdates;