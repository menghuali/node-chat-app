const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const port = process.env.PORT || 3000;
const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '..', 'public');
const {isRealString} = require('./utils/validation');

var app = new express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('join', function(params, callback) {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback('Name and room are required');
    }
    socket.join(params.room);
    // socket.leave(params.room);
    // Send the message to the current client
    socket.emit(
      'newMessage', generateMessage('admin', 'Welcome to the chat app'));

    // Send message to all clients except the current one
    socket.broadcast.to(params.room).emit(
      'newMessage', generateMessage('admin', `${params.name} just joined.`));

    callback();
  });

  // listen to the certian type of events
  socket.on('createMessage', function(message, callback) {
    // send message to all connected clients
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', function(coords) {
    io.emit('newLocationMessage', generateLocationMessage('admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from client');
  });
});

server.listen(port, () => {
  console.log('Server is up on port ', port);
});
