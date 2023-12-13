//SERVER SIDE
//STEP 2: Initialize the express 'app' object
const express = require('express');
const app = express();
app.use('/', express.static('public'));



//Initialize the actual HTTP server
const http = require('http');
const server = http.createServer(app);
let port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log('server listening at port: http://localhost:' + port);
});

//Initialize socket
const { Server } = require('socket.io');

//Initialize socket.io
// let io = require('socket.io');
// io = new io.Server(server);
const io = new Server(server);
//END OF STEP 2

//create object userObject variable to store all users and their with key value pairs storing user name and x coord and y coord
//Let object = {
// ‘Ieaujaeoiae’: {x: 0, y:0}
//}
// let usersArray = [];
const users = {};
users = { "X": xPos, "Y": yPos };

//STEP 3: server-side socket connection
//Listen for individual clients/users to connect
io.on('connection', (socket) => {
    console.log('user ' + socket.id + ' has connected');
    //users[socket.id] = {}; //adds a new user to userObject
    //STEP 6: server-side on (listening) event
    //Listen for a piece of data named 'userPosition' from this client
    socket.on('userPosition', (data) => {
        //Data can be numbers, strings, object
        console.log("Received a user positioning event");
        console.log(data);
        //users[socket.id] = data; //data is position
        // usersArray.push(data);
        //STEP 7: server-side emit event
        //Send user data to all users, including this one
        io.sockets.emit('userPosition', data);
        // socket.broadcast.emit('userPosition', data);
    });

    //Listen for this client to disconnect
    socket.on('disconnect', () => {
        console.log('user ' + socket.id + ' has disconnected');
        delete users[socket.id];
    });
});


