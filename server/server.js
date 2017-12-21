const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage,generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin','welcome to the chat app')); // sends to only the socket,emit methods has other arguments which gets passed to the other socket.on

  socket.broadcast.emit('newMessage', generateMessage('Admin','new user joined')); // sends to everybody except the socket
  socket.on('createMessage', (message,callback) => { // event listener
	    console.log('createMessage', message);
	    io.emit('newMessage', generateMessage(message.from,message.text)); //ssends to everybody
	    callback(''); //this function doesn't get executed here it get's executed in index.js

	});

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });

   socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
