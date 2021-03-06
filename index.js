var express = require('express');
var socket = require('socket.io');
var port = require('./config.js');

// App setup
var app = express();

app.set('port', port)

var server = app.listen(app.get('port'), function(){
    console.log('listening for requests on port ', app.get('port'));
});

// Static files
app.use(express.static('public'));

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {

    console.log('established socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});
